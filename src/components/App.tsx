import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { calculateTextBox, flowText, Paragraph, TextBox } from '../paragraph';

const fontSize = 12;
const lineHeight = fontSize * 1.5;
const charsPerColumn = 12;
export const columnGap = 12;

const Wrapper = styled.div<{ width: number }>`
  width: ${(prop) => prop.width}px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Column = styled.div<{ columns: number }>`
  height: ${(props) =>
    fontSize * charsPerColumn * props.columns + columnGap * (props.columns - 1)}px;
  display: flex;
  flex-direction: column;
  gap: ${columnGap / 2}px;
`;

const Row = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  gap: ${(lineHeight - fontSize) / 2}px;
`;

const Space = styled.div<{ lines: number; margin: ('left' | 'right')[] }>`
  width: ${(prop) => lineHeight * (prop.lines - 1) + fontSize}px;
  height: 100%;
  ${(prop) => prop.margin.includes('left') && `margin-left: ${(lineHeight - fontSize) / 2}px;`}
  ${(prop) => prop.margin.includes('right') && `margin-right: ${(lineHeight - fontSize) / 2}px;`}
  background: #ccc;
`;

const App = () => {
  const sampleText = [
    '　山路を登りながら、こう考えた。',
    '　智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。',
    '　住みにくさが高じると、安い所へ引き越したくなる。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。',
    '　人の世を作ったものは神でもなければ鬼でもない。やはり向う三軒両隣りにちらちらするただの人である。ただの人が作った人の世が住みにくいからとて、越す国はあるまい。あれば人でなしの国へ行くばかりだ。人でなしの国は人の世よりもなお住みにくかろう。',
    '　越す事のならぬ世が住みにくければ、住みにくい所をどれほどか、寛容て、束の間の命を、束の間でも住みよくせねばならぬ。ここに詩人という天職が出来て、ここに画家という使命が降る。あらゆる芸術の士は人の世を長閑にし、人の心を豊かにするが故に尊とい。',
    '　住みにくき世から、住みにくき煩いを引き抜いて、ありがたい世界をまのあたりに写すのが詩である、画である。あるは音楽と彫刻である。こまかに云えば写さないでもよい。ただまのあたりに見れば、そこに詩も生き、歌も湧く。着想を紙に落さぬとも鏘の音は胸裏に起る。丹青は画架に向って塗抹せんでも五彩の絢爛は自から心眼に映る。ただおのが住む世を、かく観じ得て、霊台方寸のカメラに澆季溷濁の俗界を清くうららかに収め得れば足る。この故に無声の詩人には一句なく、無色の画家には尺なきも、かく人世を観じ得るの点において、かく煩悩を解脱するの点において、かく清浄界に出入し得るの点において、またこの不同不二の乾坤を建立し得るの点において、我利私慾の覊絆を掃蕩するの点において、――千金の子よりも、万乗の君よりも、あらゆる俗界の寵児よりも幸福である。',
    '　山路を登りながら、こう考えた。',
    '　智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。',
    '　住みにくさが高じると、安い所へ引き越したくなる。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。',
    '　人の世を作ったものは神でもなければ鬼でもない。やはり向う三軒両隣りにちらちらするただの人である。ただの人が作った人の世が住みにくいからとて、越す国はあるまい。あれば人でなしの国へ行くばかりだ。人でなしの国は人の世よりもなお住みにくかろう。',
    '　越す事のならぬ世が住みにくければ、住みにくい所をどれほどか、寛容て、束の間の命を、束の間でも住みよくせねばならぬ。ここに詩人という天職が出来て、ここに画家という使命が降る。あらゆる芸術の士は人の世を長閑にし、人の心を豊かにするが故に尊とい。',
    '　住みにくき世から、住みにくき煩いを引き抜いて、ありがたい世界をまのあたりに写すのが詩である、画である。あるは音楽と彫刻である。こまかに云えば写さないでもよい。ただまのあたりに見れば、そこに詩も生き、歌も湧く。着想を紙に落さぬとも鏘の音は胸裏に起る。丹青は画架に向って塗抹せんでも五彩の絢爛は自から心眼に映る。ただおのが住む世を、かく観じ得て、霊台方寸のカメラに澆季溷濁の俗界を清くうららかに収め得れば足る。この故に無声の詩人には一句なく、無色の画家には尺なきも、かく人世を観じ得るの点において、かく煩悩を解脱するの点において、かく清浄界に出入し得るの点において、またこの不同不二の乾坤を建立し得るの点において、我利私慾の覊絆を掃蕩するの点において、――千金の子よりも、万乗の君よりも、あらゆる俗界の寵児よりも幸福である。',
  ];

  const sampleParagraphs: Paragraph[] = sampleText.map((line) => ({
    fontSize,
    lineHeight,
    content: line,
  }));
  const textBoxes: TextBox[] = [
    calculateTextBox(fontSize, lineHeight, charsPerColumn, 15, true),
    calculateTextBox(fontSize, lineHeight, charsPerColumn, 15, true),
    calculateTextBox(fontSize, lineHeight, charsPerColumn, 25, true),
    calculateTextBox(fontSize, lineHeight, charsPerColumn, 32, true),
  ];
  const splitedParagraphs = flowText(sampleParagraphs, textBoxes);

  return (
    <Wrapper width={textBoxes[3].width}>
      <Column columns={4}>
        <Row>
          <Space lines={7} margin={['right']} />
          <Column columns={3}>
            <Row>
              <Column columns={2}>
                <Text box={textBoxes[0]} paragraphs={splitedParagraphs[0]} topBorder={false} />
                <Text box={textBoxes[1]} paragraphs={splitedParagraphs[1]} topBorder />
              </Column>
              <Space lines={10} margin={['left']} />
            </Row>
            <Text box={textBoxes[2]} paragraphs={splitedParagraphs[2]} topBorder />
          </Column>
        </Row>
        <Text box={textBoxes[3]} paragraphs={splitedParagraphs[3]} topBorder />
      </Column>
    </Wrapper>
  );
};

export default App;
