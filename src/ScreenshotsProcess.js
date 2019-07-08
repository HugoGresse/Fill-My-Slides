import gapi from "./gapi"
import { serialPromise } from "./serialPromise"


export const generateScreenshots = (presentationId,
                                    pageObjectId,
                                    replacementData,
                                    selectedShapes,
                                    callbacksProgress,
                                    callbacksDone) => {
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
    }).then(results => {
        console.log("promise done", results)
        results.forEach(result => {
            if (result.result.contentUrl) {
                console.log(result.result.contentUrl)
            }
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
