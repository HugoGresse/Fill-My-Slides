import gapi from "../gapi"
import { serialPromise } from "./serialPromise"
import * as JSZipUtils from "jszip-utils"
import { saveAs } from "file-saver"
import * as JSZip from "jszip"
import { trackNumberOfGeneratedSlides } from "../tracking/track"


export const generateScreenshots = (presentationId,
                                    pageObjectId,
                                    replacementData,
                                    selectedShapes,
                                    callbacksProgress,
                                    callbacksScreenshotsDone,
                                    callbacksZipping) => {
    const promises = []

    replacementData.forEach(data => {
        promises.push(gapi.client.slides.presentations.batchUpdate({
            presentationId: presentationId,
            requests: generateRequest(selectedShapes, data)
        }))

        // noinspection JSDeprecatedSymbols
        promises.push(gapi.client.slides.presentations.pages.getThumbnail({
            "presentationId": presentationId,
            "pageObjectId": pageObjectId,
            "thumbnailProperties.mimeType": "PNG",
            "thumbnailProperties.thumbnailSize": "LARGE"
        }))
    })


    serialPromise(promises, status => {
        callbacksProgress(status)
    }).then(responses => {
        const images = []
        responses.forEach(result => {
            if (result.result.contentUrl) {
                images.push(result.result.contentUrl)
            }
        })

        callbacksScreenshotsDone(images)
        return images
    }).then(images => {
        return generateZip(new JSZip(), images, (inProgress) => {
            callbacksZipping(inProgress)
        })
    })
}


const generateRequest = (selectedShapes, data) => {
    const requests = []

    const keys = Object.keys(data)

    selectedShapes.forEach((shape, index) => {
        requests.push({
            deleteText: {
                objectId: shape.objectId,
                textRange: {
                    type: 'ALL'
                }
            }
        })
        requests.push({
            insertText: {
                objectId: shape.objectId,
                insertionIndex: 0,
                text: data[keys[index]]
            }
        })
    })

    return requests
}

const generateZip = (zip, urls, progression) => {
    return new Promise((resolve, reject) => {
        urls.forEach((url, index) => {
            zip.file(index + ".png", urlToPromise(url), {binary: true});
        })

        progression(true)

        // when everything has been downloaded, we can trigger the dl
        zip.generateAsync({type: "blob"}, (metadata) => {
            progression(true)
        }).then((blob) => {
            saveAs(blob, "images-fillmyslides" + new Date().toISOString() + ".zip");
            progression(false)
            trackNumberOfGeneratedSlides(urls.length)
            resolve()
        }, (e) => {
            progression(false)
            reject(e)
        });
    })

}


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
