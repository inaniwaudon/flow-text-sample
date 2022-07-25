import React from 'react';
import styled from 'styled-components';
import { columnGap } from './App';
import { Paragraph, TextBox } from '../paragraph';

const Wrapper = styled.div<{ width: number; height: number; topBorder: boolean }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  text-align: justify;
  display: flex;
  flex-direction: row-reverse;
  ${(props) =>
    props.topBorder ? `border-top: solid 1px #ccc; padding-top: ${columnGap / 2}px;` : ''}
  font-family: toppan-bunkyu-mincho-pr6n, serif;
`;

const ParagraphElement = styled.div<{
  fontSize: number;
  lineHeight: number;
}>`
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  writing-mode: vertical-rl;
`;

interface TextProps {
  box: TextBox;
  paragraphs: Paragraph[];
  topBorder: boolean;
}

const Text = ({ box, paragraphs, topBorder }: TextProps) => (
  <Wrapper width={box.width} height={box.height} topBorder={topBorder}>
    {paragraphs.map((paragraph, index) => (
      <ParagraphElement fontSize={paragraph.fontSize} lineHeight={paragraph.lineHeight} key={index}>
        {paragraph.content}
      </ParagraphElement>
    ))}
  </Wrapper>
);

export default Text;
