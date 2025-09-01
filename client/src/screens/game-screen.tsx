import { useEffect, useState } from 'react'
import gsap from 'gsap'
import {
  ConfusedStickMan,
  DeadStickMan,
  HangExecutor,
  HappyStickMan,
  SadStickMan,
  SadStickMan2,
} from './sprites/stick-mans'
import { HangBox, HangFrame, HangRope } from './sprites/assets'
import { Button } from '@/components/ui/button'

const InitialScene = ({
  currentStickMan,
}: {
  currentStickMan?: React.JSX.Element
}) => {
  return (
    <svg
      width="492"
      height="500"
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

export default function GameScreen() {
  const [currentStickMan, setCurrentStickMan] = useState(<DeadStickMan />)
  const [currentGameState, setCurrentGameState] = useState<string>('p0')

  useEffect(() => {
    const gamePlayTimeline = gsap
      .timeline({ paused: true })
      .addLabel('p25')
      .fromTo(
        '#hang-frame',
        {
          opacity: 0,
          scaleY: 0,
          transformOrigin: 'bottom center',
        },
        {
          scaleY: 1,
          opacity: 1,
        },
      )
      .fromTo(
        '#hang-box',
        {
          opacity: 0,
          transformOrigin: 'center center',
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back',
        },
      )
      .addLabel('p50')
      .fromTo(
        '#hang-rope',
        {
          scaleY: 0,
          transformOrigin: 'top center',
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
        },
      )
      .addLabel('p75')
      .to('#hang-man', {
        x: -120,
      })
      .to('#hang-man', {
        y: -60,
      })
      .to(
        '#hang-executor',
        {
          xPercent: 20,
          duration: 0.8,
        },
        '<',
      )
      .addLabel('p100')
      .to('#hang-exec-right-leg', {
        rotate: -90,
      })
      .to(
        '#hang-box',
        {
          xPercent: 200,
        },
        '<',
      )
      .to(
        '#hang-rope-hook',
        {
          scaleX: 0,
          scaleY: 0,
          duration: 0.2,
          opacity: 0,
          transformOrigin: 'center center',
        },
        '<',
      )
      .set('#hang-man', {
        x: -68,
        y: -68,
      })
      .to(
        '#hang-man',
        {
          y: -68,
          x: -68,
          duration: 0.0001,
        },
        '<',
      )
    switch (currentGameState) {
      case 'p0':
        setCurrentStickMan(<HappyStickMan />)
        break
      case 'p25':
        setCurrentStickMan(<SadStickMan2 />)
        gamePlayTimeline.tweenFromTo('p25', 'p50')
        break
      case 'p50':
        setCurrentStickMan(<ConfusedStickMan />)
        gamePlayTimeline.tweenFromTo('p50', 'p75')
        break
      case 'p75':
        setCurrentStickMan(<SadStickMan />)
        gamePlayTimeline.tweenFromTo('p75', 'p100')
        break
      case 'p100':
        setCurrentStickMan(<DeadStickMan />)
        gamePlayTimeline.play('p100')
        break
      case 'rev':
        setCurrentStickMan(<HappyStickMan />)
        gamePlayTimeline.reverse()
        break
      default:
        break
    }
  }, [currentGameState])

  useEffect(() => {
    gsap.set('#hang-man', { xPercent: 160, yPercent: 52 })
    gsap.set('#hang-executor', { xPercent: -500, yPercent: 0 })
    gsap.set(['#hang-frame', '#hang-man', '#hang-rope', '#hang-box'], {
      opacity: 0,
    })
    const hangManIntroTimeLine = gsap
      .timeline()
      .add('intro')
      .fromTo(
        '#ground',
        {
          xPercent: -100,
          duration: 0.4,
        },
        {
          xPercent: 0,
        },
      )
      .fromTo(
        '#hang-man',
        {
          xPercent: 500,
          opacity: 0,
        },
        {
          xPercent: 150,
          opacity: 1,
          ease: 'back',
        },
      )
      .add('end')
      .to(
        '#hang-executor',
        {
          xPercent: -100,
          ease: 'back',
        },
        '<',
      )
    hangManIntroTimeLine.play()
  }, [])

  return (
    <div className="h-full w-full flex justify-evenly lg:flex-row flex-col">
      <div className="h-full w-full bg-red-100 flex justify-center items-center">
        <div
          id="game-scene-container"
          className="flex justify-center items-center rounded-md overflow-hidden"
        >
          <InitialScene currentStickMan={currentStickMan} />
        </div>
      </div>
      <div className="h-full w-full bg-blue-100">
        <Button onClick={() => setCurrentGameState('p0')}>P0</Button>
        <Button onClick={() => setCurrentGameState('p25')}>P25</Button>
        <Button onClick={() => setCurrentGameState('p50')}>P50</Button>
        <Button onClick={() => setCurrentGameState('p75')}>P75</Button>
        <Button onClick={() => setCurrentGameState('p100')}>P100</Button>
        <Button onClick={() => setCurrentGameState('rev')}>Reverse</Button>
      </div>
    </div>
  )
}
