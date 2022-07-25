export interface Paragraph {
  fontSize: number;
  lineHeight: number;
  content: string;
}

export interface TextBox {
  width: number;
  height: number;
  isVertical: boolean;
}

const measuringElement = document.createElement('div');

export const calculateParagraphHeight = (
  paragraph: Paragraph,
  width: number,
  leftHeight: number,
  isVertical: boolean
) => {
  // initialize the element for the test
  measuringElement.style.display = 'inline-block';
  if (isVertical) {
    measuringElement.style.height = `${width}px`;
  } else {
    measuringElement.style.width = `${width}px`;
  }
  measuringElement.style.fontSize = `${paragraph.fontSize}px`;
  measuringElement.style.lineHeight = `${paragraph.lineHeight}px`;
  measuringElement.style.writingMode = `${isVertical ? 'vertical-rl' : 'lr-tb'}`;

  const calculate = (content: string) => {
    measuringElement.innerHTML = content;
    const rect = measuringElement.getBoundingClientRect();
    return isVertical ? rect.width : rect.height;
  };

  // biary search
  let [left, right] = [0, paragraph.content.length];
  let measuredHeight = 0;
  while (right - left > 1) {
    const mid = Math.ceil((left + right) / 2);
    measuredHeight = calculate(paragraph.content.substring(0, mid));
    if (measuredHeight < leftHeight) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return [right, measuredHeight];
};

export const flowText = (paragraphs: Paragraph[], boxes: TextBox[]): Paragraph[][] => {
  const processedParagraphs: Paragraph[] = [...paragraphs.map((paragraph) => ({ ...paragraph }))];
  const resultParagraphs: Paragraph[][] = [];
  document.body.appendChild(measuringElement);

  boxes.forEach((box, index) => {
    resultParagraphs.push([]);
    let leftHeight = box.isVertical ? box.width : box.height;

    while (processedParagraphs.length > 0) {
      const paragraph = processedParagraphs[0];
      const [right, measuredHeight] = calculateParagraphHeight(
        paragraph,
        box.isVertical ? box.height : box.width,
        leftHeight,
        box.isVertical
      );
      // The text box is full with the paragraph
      if (right < paragraph.content.length) {
        resultParagraphs[index].push({
          ...paragraph,
          content: paragraph.content.slice(0, right),
        });
        processedParagraphs[0].content = processedParagraphs[0].content.slice(right);
        break;
      }
      // There is room for the text box to flow the subsequent paragraph
      else {
        resultParagraphs[index].push({ ...paragraph });
        processedParagraphs.shift();
        leftHeight -= measuredHeight;
      }
    }
  });

  // document.body.removeChild(measuringElement);
  return resultParagraphs;
};

export const calculateTextBox = (
  fontSize: number,
  lineHeight: number,
  chars: number,
  lines: number,
  isVertical: boolean
): TextBox => {
  const width = fontSize * chars;
  const height = lineHeight * lines;
  return { ...(isVertical ? { width: height, height: width } : { width, height }), isVertical };
};
