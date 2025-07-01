const getTextShape = (slide) => {
  return slide.pageElements
    .filter((e) => {
      if (!e.shape) return 0;
      return (
        e.shape.shapeType === "TEXT_BOX" ||
        e.shape.shapeType === "SNIP_2_SAME_RECTANGLE"
      );
    })
    .map((pageElement) => {
      const text = pageElement.shape.text.textElements.reduce(
        (acc, textElement) => {
          if (!textElement.textRun || !textElement.textRun.content) return acc;
          acc += textElement.textRun.content;
          return acc;
        },
        ""
      );

      return {
        objectId: pageElement.objectId,
        text: text,
      };
    });
};

export default getTextShape;
