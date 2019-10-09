const getImageShape = (slide) => {
    return slide.pageElements.filter(e => {
        if (!e.image) return 0
        return !!e.image.contentUrl
    }).map(pageElement => {
        return {
            objectId: pageElement.objectId,
            imageUrl: pageElement.image.contentUrl
        }
    })
}

export default getImageShape