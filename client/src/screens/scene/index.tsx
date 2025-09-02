import { HangBox, HangFrame, HangRope } from '../sprites/assets'
import { HangExecutor } from '../sprites/stick-mans';

const InitialScene = ({
  currentStickMan,
}: {
  currentStickMan?: React.JSX.Element
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 492 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_113_13)">
        <rect id="scene-bg" width="492" height="500" fill="white" />
        <g id="hang-frame">
          <HangFrame />
        </g>
        <g id="hang-man">{currentStickMan}</g>
        <line
          id="ground"
          x1="-0.00463867"
          y1="425.5"
          x2="492.004"
          y2="425.5"
          stroke="black"
          stroke-width="4"
        />
        <g id="hang-box">
          <HangBox />
        </g>
        <g id="hang-rope">
          <HangRope />
        </g>
        <g id="hang-executor">
          <HangExecutor />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_113_13">
          <rect width="492" height="500" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}


export default InitialScene;