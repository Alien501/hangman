import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import gsap from 'gsap'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import confetti from 'canvas-confetti'
import {
  ConfusedStickMan,
  DeadStickMan,
  HappyStickMan,
  SadStickMan,
  SadStickMan2,
} from './sprites/stick-mans'
import InitialScene from './scene'
import Keyboard from '@/components/keyboard'
import { Button } from '@/components/ui/button'
import { getWord } from '@/api/getWord'
import { meiyezhuthu, uyirEzhuthu, uyirMeiyeazhuthu } from '@/data/letters'
import SuccessModal from '@/components/SuccessModal'

interface WordData {
  englishmeaning: string
  id: number
  tamilpronounce: string
  tamilword: string
}

export default function GameScreen() {
  const fetchWord = async () => {
    const fetchedData = await getWord(setWord)
    setWordData(fetchedData[0])
    return fetchedData
  }

  const { refetch } = useQuery({
    queryKey: ['word'],
    queryFn: fetchWord,
  })

  const { i18n, t } = useTranslation()

  const [word, setWord] = useState<Array<string> | null>([])
  const [wordData, setWordData] = useState<WordData | null>(null)
  const [currentStickMan, setCurrentStickMan] = useState(<HappyStickMan />)
  const [currentGameState, setCurrentGameState] = useState<string>('p0')
  const [gamePlayTimeline, setGamePlayTimeline] =
    useState<gsap.core.Timeline | null>(null)
  const [meiyezhuthuPressed, setMeiyezhuthuPressed] = useState<number | null>(
    null,
  )
  const [uyirezhuthuPressed, setUyirezhuthuPressed] = useState<number | null>(
    null,
  )
  const [guessedGraphemes, setGuessedGraphemes] = useState<Array<string>>([])
  const [errors, setErrors] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  console.log(score)

  const getPlayableLength = (arr: Array<string> | null) =>
    arr ? arr.filter((ch) => ch !== ' ').length : 0

  const setTimelineForErrorCount = (errorCount: number) => {
    const maxErrors = word ? getPlayableLength(word) + 1 : 5

    if (errorCount <= 0) {
      setCurrentGameState('p0')
      return
    }

    if (errorCount >= maxErrors) {
      setCurrentGameState('p100')
      return
    }

    const steps = 3 // p25, p50, p75
    const denom = Math.max(1, maxErrors - 1)
    const ratio = errorCount / denom
    const band = Math.min(steps, Math.max(1, Math.ceil(ratio * steps)))

    switch (band) {
      case 1:
        setCurrentGameState('p25')
        break
      case 2:
        setCurrentGameState('p50')
        break
      case 3:
      default:
        setCurrentGameState('p75')
        break
    }
  }

  const resetGame = () => {
    setGuessedGraphemes([])
    setErrors(0)
    setIsGameOver(false)
    setMeiyezhuthuPressed(null)
    setUyirezhuthuPressed(null)
    setTimelineForErrorCount(0)
    refetch()
  }

  const revealWord = () => {
    if (!word) return
    const unique = Array.from(new Set(word))
    setGuessedGraphemes(unique)
  }

  const handleGameOverIfNeeded = (nextErrors: number) => {
    const maxErrors = word ? getPlayableLength(word) + 1 : 5
    if (nextErrors >= maxErrors) {
      revealWord()
      setIsGameOver(true)
      toast.error(t('toast.gameOver'), {
        description: t('toast.gameOverDescription'),
        action: {
          label: 'Restart',
          onClick: () => resetGame(),
        },
        position: 'top-center',
      })
    }
  }

  const submitGuess = (chosen: string) => {
    if (!chosen || !word || isGameOver) return
    if (guessedGraphemes.includes(chosen)) return

    const isHit = word.some((g) => g === chosen)
    if (isHit) {
      const nextGuessed = [...guessedGraphemes, chosen]
      setGuessedGraphemes(nextGuessed)
      toast.success(t('toast.correct'), {
        description: `"${chosen}" ${t('toast.correctDescription')}`,
        position: 'top-center',
      })

      const nonSpaceWord = word.filter((g) => g !== ' ')
      const isComplete = nonSpaceWord.every((g) => nextGuessed.includes(g))
      if (isComplete) {
        setScore((prev) => prev + 1)
        setErrors((prev) => {
          const next = Math.max(0, prev - 1)
          setTimelineForErrorCount(next)
          return next
        })
        setGuessedGraphemes([])
        setMeiyezhuthuPressed(null)
        setUyirezhuthuPressed(null)

        let end = 10
        const colors = [
          '#ff8079',
          '#d40c00',
          '#00a5f9',
          '#77d2ff',
          '#32c12c',
          '#75fa71',
          '#ff5500',
          '#ff9a00',
        ]

        ;(function frame() {
          confetti({
            particleCount: 20,
            angle: 60,
            spread: 45,
            origin: { x: 0, y: 1 },
            colors: colors,
          })
          confetti({
            particleCount: 20,
            angle: 120,
            spread: 45,
            origin: { x: 1, y: 1 },
            colors: colors,
          })
          confetti({
            origin: {
              y: 1,
            },
            spread: 90,
            particleCount: 30,
          })

          if (0 < end--) {
            requestAnimationFrame(frame)
          }
        })()
        setShowSuccessModal(true)
      }
    } else {
      setErrors((prev) => {
        const next = prev + 1
        setTimelineForErrorCount(next)
        handleGameOverIfNeeded(next)
        return next
      })
      toast.error(t('toast.wrong'), {
        description: `"${chosen}" ${t('toast.wrongDescription')}.`,
        position: 'top-center',
      })
      setMeiyezhuthuPressed(null)
      setUyirezhuthuPressed(null)
    }
  }

  // Function to initialize/reset the scene to its initial state
  const initializeScene = () => {
    gsap.set('#hang-man', { xPercent: 150, yPercent: 52, x: 0, y: 0 })
    gsap.set('#hang-executor', { xPercent: -100, yPercent: 0, rotation: 0 })
    gsap.set('#hang-exec-right-leg', { rotate: 0 })
    gsap.set(['#hang-frame', '#hang-rope', '#hang-box'], {
      opacity: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 0,
      xPercent: 0,
    })
    gsap.set('#hang-rope-hook', {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    })
    gsap.set('#hang-man', { opacity: 1 })
    gsap.set('#ground', { xPercent: 0 })
  }

  // Create the game timeline once
  useEffect(() => {
    const timeline = gsap
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
        duration: 0.4,
        ease: 'back',
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
          ease: 'back',
          duration: 0.0001,
        },
        '<',
      )

    setGamePlayTimeline(timeline)
  }, [])

  // Handle game state changes
  useEffect(() => {
    if (!gamePlayTimeline) return

    switch (currentGameState) {
      case 'p0':
        setCurrentStickMan(<HappyStickMan />)
        gamePlayTimeline.pause().progress(0)
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
        initializeScene()
        break
      default:
        break
    }
  }, [currentGameState, gamePlayTimeline])

  // Initial scene setup and intro animation
  useEffect(() => {
    // Set initial positions before intro animation
    gsap.set('#hang-man', { xPercent: 500, yPercent: 52, opacity: 0 })
    gsap.set('#hang-executor', { xPercent: -500, yPercent: 0 })
    gsap.set(['#hang-frame', '#hang-rope', '#hang-box'], {
      opacity: 0,
    })
    gsap.set('#ground', { xPercent: -100 })

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
      .call(() => {
        initializeScene()
      })

    hangManIntroTimeLine.play()
  }, [])

  // const AnimationControls = () => {
  //   return (
  //     <>
  //       <Button onClick={() => setCurrentGameState('p0')}>P0 (Initial)</Button>
  //       <Button onClick={() => setCurrentGameState('p25')}>P25</Button>
  //       <Button onClick={() => setCurrentGameState('p50')}>P50</Button>
  //       <Button onClick={() => setCurrentGameState('p75')}>P75</Button>
  //       <Button onClick={() => setCurrentGameState('p100')}>P100 (End)</Button>
  //       <Button onClick={() => window.location.reload()} variant="outline">
  //         Reset to Initial
  //       </Button>
  //     </>
  //   )
  // }

  const onUyirEzhuthuPressed = (value: number) => {
    if (meiyezhuthuPressed || meiyezhuthuPressed == 0) {
      // Selecting Uyir together with a Mei → requires confirmation
      if (uyirezhuthuPressed == value) setUyirezhuthuPressed(null)
      else {
        setUyirezhuthuPressed(value)
      }
    } else {
      // Uyir alone is a direct input (submit immediately)
      const chosen = uyirEzhuthu[value]
      submitGuess(chosen)
    }
  }

  const onMeiyezhuthuPressed = (idx: number) => {
    setUyirezhuthuPressed(null)
    if (meiyezhuthuPressed == idx) {
      setMeiyezhuthuPressed(null)
    } else {
      setMeiyezhuthuPressed(idx)
    }
  }

  const onHintPressed = () => {
    toast.warning(t('game.hint'), {
      description: wordData?.englishmeaning.toUpperCase(),
      position: 'top-center',
    })
  }

  const handleContinueGame = () => {
    setShowSuccessModal(false)
    refetch()
  }

  const handleQuitGame = () => {
    setShowSuccessModal(false)
    // Navigate back to home screen
    window.location.reload()
  }

  const onConfirmPressed = () => {
    // Allow either Mei alone, or composed UyirMei. Uyir alone is handled on click.
    if (meiyezhuthuPressed || meiyezhuthuPressed === 0) {
      const mei = meiyezhuthu[meiyezhuthuPressed]
      if (uyirezhuthuPressed || uyirezhuthuPressed === 0) {
        const chosen = uyirMeiyeazhuthu[mei][uyirezhuthuPressed] || null
        if (!chosen) return
        submitGuess(chosen)
      } else {
        // Submit Mei alone
        submitGuess(mei)
      }
    }
  }

  return (
    <div
      className={`h-full w-full flex justify-evenly lg:flex-row flex-col ${i18n.language.startsWith('ta') ? 'font-noto-tamil' : 'font-open-sans'} relative`}
    >
      <div className="h-full w-full flex justify-center items-center bg-blue-200/0 relative">
        <div className="flex flex-col gap-2 absolute top-4 lg:top-10 z-10">
          <div className="flex items-center justify-center space-x-2 flex-wrap p-4">
            {word?.map((w, i) =>
              w === ' ' ? (
                <div key={i} className="w-[clamp(12px,2vw,20px)]" />
              ) : (
                <div
                  key={i}
                  className="answer-box shadow-[4px_4px_0px_#000] w-[clamp(28px,8vw,44px)] h-[clamp(28px,8vw,44px)] border-2 border-black p-0.5 flex items-center justify-center relative"
                >
                  <span
                    className={`absolute h-[90%] w-[90%] text-sm font-semibold ${guessedGraphemes.includes(w) ? 'bg-green-400' : 'bg-red-400'} flex items-center justify-center`}
                  >
                    <span>{guessedGraphemes.includes(w) ? w : ''}</span>
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
        <div
          id="game-scene-container"
          className="relative z-0 flex justify-center items-center overflow-hidden w-full max-w-[420px] aspect-square p-2 border-4 border-black shadow-[4px_4px_0px_#000]"
        >
          <div className="hint-button-wrapper absolute bottom-2 left-2 z-10">
            <Button
              onClick={onHintPressed}
              className="rounded-none bg-orange-400 text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:bg-orange-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-bulb"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                <path d="M9.7 17l4.6 0" />
              </svg>
            </Button>
          </div>
          <div className="absolute right-2 lg:top-1 bg-green-300 border-3 shadow-[4px_4px_0px_#000] border-black py-2 px-2 font-bold">
            {word
              ? `${t('game.moves')}: ${errors}/${getPlayableLength(word) + 1}`
              : ''}
          </div>
          <InitialScene currentStickMan={currentStickMan} />
        </div>
      </div>
      <div className="h-full w-full p-4 bg-red-200/0 flex justify-center items-center flex-col">
        <div className="mb-2 text-sm">
          {meiyezhuthuPressed || meiyezhuthuPressed === 0
            ? uyirezhuthuPressed || uyirezhuthuPressed === 0
              ? `${uyirMeiyeazhuthu[meiyezhuthu[meiyezhuthuPressed]][uyirezhuthuPressed]}`
              : `${meiyezhuthu[meiyezhuthuPressed]}`
            : ''}
          {word ? '' : ''}
        </div>
        {word && word.length > 0 ? (
          <Keyboard
            uyirEzhuthu={[...uyirEzhuthu]}
            meiyezhuthu={[...meiyezhuthu]}
            onUyirEzhuthuPressed={onUyirEzhuthuPressed}
            onMeiyezhuthuPressed={onMeiyezhuthuPressed}
            uyirezhuthuPressed={uyirezhuthuPressed}
            meiyezhuthuPressed={meiyezhuthuPressed}
            onConfirmPressed={onConfirmPressed}
            onRestartPressed={resetGame}
          />
        ) : (
          <div className="w-full max-w-[480px] h-[180px] border-4 border-black shadow-[6px_6px_0px_#000] bg-yellow-200 flex items-center justify-center font-bold">
            {t('game.loading')}
          </div>
        )}
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onContinue={handleContinueGame}
        onQuit={handleQuitGame}
        wordData={wordData}
      />
    </div>
  )
}
