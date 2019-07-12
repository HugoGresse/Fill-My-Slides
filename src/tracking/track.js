
const trackingCollector = "https://endpoint1.collection.eu.sumologic.com/receiver/v1/http/ZaVnC4dhaV25JBoXQgTMMoG0erOh7kd94cRdW2iIGB2KJFBvet8EoWRGw22twROKkBRUuL29x2Va4qfJFj5DM8-V2oWuO1wRvLhrr536rb56GHkQG8jPTA=="

export const trackNumberOfGeneratedSlides = (count) => {
    const http = new XMLHttpRequest()
    http.open('POST', trackingCollector, true)
    http.send(JSON.stringify({
        slidesCount: count
    }))
}
