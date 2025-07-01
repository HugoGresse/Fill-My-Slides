import gapi from "../../gapi";
import { serialPromise } from "./serialPromise";
import * as JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { trackNumberOfGeneratedSlides } from "../../tracking/track";

export const generateScreenshots = (
  presentationId,
  pageObjectId,
  replacementData,
  selectedTextShapes,
  selectedImageShapes,
  callbacksProgress,
  callbacksScreenshotsDone,
  callbacksZipping
) => {
  const promises = [];

  // Store imageIds in order
  const imageIds = replacementData.map((data) => data.imageId);

  replacementData.forEach((data) => {
    const imageValues = Object.values(data).filter(
      (value) => value.startsWith("http://") || value.startsWith("https://")
    );
    const textValues = Object.values(data).filter(
      (value) =>
        !value.startsWith("http://") &&
        !value.startsWith("https://") &&
        Object.keys(data).find((key) => data[key] === value) !== "imageId"
    );

    const requests = [
      ...generateImageRequest(selectedImageShapes, imageValues),
      ...generateTextRequest(selectedTextShapes, textValues),
    ];

    promises.push(
      gapi.client.slides.presentations.batchUpdate({
        presentationId: presentationId,
        requests: requests,
      })
    );

    // noinspection JSDeprecatedSymbols
    promises.push(
      gapi.client.slides.presentations.pages.getThumbnail({
        presentationId: presentationId,
        pageObjectId: pageObjectId,
        "thumbnailProperties.mimeType": "PNG",
        "thumbnailProperties.thumbnailSize": "LARGE",
      })
    );
  });

  serialPromise(promises, (status) => {
    callbacksProgress(status);
  })
    .then((responses) => {
      // Collect images with their imageId
      const images = [];
      let imageIdIndex = 0;
      responses.forEach((result) => {
        if (result.result.contentUrl) {
          images.push({
            url: result.result.contentUrl,
            imageId: imageIds[imageIdIndex] || `${imageIdIndex}`,
          });
          imageIdIndex++;
        }
      });

      callbacksScreenshotsDone(images.map((img) => img.url));
      return images;
    })
    .then((images) => {
      return generateZip(new JSZip(), images, (inProgress) => {
        callbacksZipping(inProgress);
      });
    });
};

const generateTextRequest = (selectedTextShapes, data) => {
  const requests = [];

  if (!selectedTextShapes) return requests;

  const keys = Object.keys(data);

  selectedTextShapes.forEach((shape, index) => {
    requests.push({
      deleteText: {
        objectId: shape.objectId,
        textRange: {
          type: "ALL",
        },
      },
    });
    requests.push({
      insertText: {
        objectId: shape.objectId,
        insertionIndex: 0,
        text: data[keys[index]],
      },
    });
  });

  return requests;
};

const generateImageRequest = (selectedImageShape, data) => {
  const requests = [];

  if (!selectedImageShape) return requests;

  const keys = Object.keys(data);

  selectedImageShape.forEach((shape, index) => {
    requests.push({
      replaceImage: {
        imageObjectId: shape.objectId,
        imageReplaceMethod: "CENTER_INSIDE",
        url: data[keys[index]],
      },
    });
  });

  return requests;
};

const generateZip = (zip, images, progression) => {
  return new Promise((resolve, reject) => {
    images.forEach((img, index) => {
      // Use imageId as filename, fallback to index if missing
      const filename = (img.imageId ? img.imageId : index) + ".png";
      zip.file(filename, urlToPromise(img.url), { binary: true });
    });

    progression(true);

    // when everything has been downloaded, we can trigger the dl
    zip
      .generateAsync({ type: "blob" }, (metadata) => {
        progression(true);
      })
      .then(
        (blob) => {
          saveAs(
            blob,
            "images-fillmyslides" + new Date().toISOString() + ".zip"
          );
          progression(false);
          trackNumberOfGeneratedSlides(images.length);
          resolve();
        },
        (e) => {
          progression(false);
          reject(e);
        }
      );
  });
};

function urlToPromise(url) {
  return new Promise((resolve, reject) => {
    return JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
