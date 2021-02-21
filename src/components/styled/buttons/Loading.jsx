import styled, { keyframes /* , css */ } from "styled-components";

const speed = "1s";
/* const dotSize = 4;
const dotColor = "white"; */
/* 
const aniDot = keyframes`
  100% {
    transform: translateX(${dotSize * 6}px);
  }
`;

const aniDots = keyframes`
  100% {
    transform: translateX(${dotSize * -2}px);
  }
`; */

const ani = keyframes`
  100% {
    transform: translateY(-0.2em);
  }
`;

/* const dot = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  background-color: ${dotColor};
  transform: translateX(0);
  filter: blur(4px);
  border-radius: 50%;
`; */

const Gooey = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: inherit;
`;
/* 
const OneDot = styled.span`
  ${dot}
  position: absolute;
  top: calc(50% - ${dotSize / 2}px);
  left: calc(50% - ${dotSize * 3.5}px);
  animation: ${aniDot} ${speed} ease-in-out infinite;
`;

const Dots = styled.span`
  position: absolute;
  top: calc(50% - ${dotSize / 2}px);
  left: calc(50% - ${dotSize * 1.5}px);
  animation: ${aniDots} ${speed} ease-in-out infinite;
  display: flex;
  justify-content: space-between;
  width: ${dotSize * 5}px;
`; */

const OtherDot = styled.span`
  display: inline-block;
  color: inherit;
  animation: ${ani} ${speed} ease-in-out infinite alternate;
  animation-delay: ${(props) => props.delay}s;
  transform: translateY(0);
`;

const Loading = (props) => {
  return (
    <Gooey>
      <OtherDot delay={0}>.</OtherDot>
      <OtherDot delay={0.4}>.</OtherDot>
      <OtherDot delay={0.8}>.</OtherDot>
    </Gooey>
  );
};

export default Loading;
