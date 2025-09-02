import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import gsap from 'gsap'
import {
  ConfusedStickMan,
  DeadStickMan,
  HappyStickMan,
  SadStickMan,
  SadStickMan2,
} from './sprites/stick-mans'
import InitialScene from './scene'
import { Button } from '@/components/ui/button'
import Keyboard from '@/components/keyboard'

export default function GameScreen() {
  const getWord = async () => {
    try {
      const wordResponse = await fetch('https://api.tamilwords.net/');
      if(wordResponse.ok) {
        const data = await wordResponse.json();
        const segmenter = new Intl.Segmenter('ta', { granularity: 'grapheme' });
        const segments = segmenter.segment(data[0].tamilword);
        const graphemes = Array.from(segments, segment => segment.segment);
        
        setWord(graphemes);
        return data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const { data } = useQuery({
    queryKey: ['word'],
    queryFn: getWord,
  });
  
  const [word, setWord] = useState<Array<string> | null>([]);
  const [currentStickMan, setCurrentStickMan] = useState(<HappyStickMan />)
  const [currentGameState, setCurrentGameState] = useState<string>('p0')
  const [gamePlayTimeline, setGamePlayTimeline] = useState<gsap.core.Timeline | null>(null);
  const [userWord, setUserWord] = useState('');
  const [meiyezhuthuPressed, setMeiyezhuthuPressed] = useState<number | null>(null);
  const [uyirezhuthuPressed, setUyirezhuthuPressed] = useState<number | null>(null);


  const uyirEzhuthu = ["அ","ஆ","இ","ஈ","உ","ஊ","எ","ஏ","ஐ","ஒ","ஓ","ஔ"]
  const meiyezhuthu = ['க்', 'ங்', 'ச்', 'ஞ்', 'ட்', 'ண்', 'த்', 'ந்', 'ப்', 'ம்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்', 'ற்', 'ன்']
  const uyirMeiyeazhuthu = 
  {
    "க்": ["க","கா","கி","கீ","கு","கூ","கெ","கே","கை","கொ","கோ","கௌ"],
    "ங்": ["ங","ஙா","ஙி","ஙீ","ஙு","ஙூ","ஙெ","ஙே","ஙை","ஙொ","ஙோ","ஙௌ"],
    "ச்": ["ச","சா","சி","சீ","சு","சூ","செ","சே","சை","சொ","சோ","சௌ"],
    "ஞ்": ["ஞ","ஞா","ஞி","ஞீ","ஞு","ஞூ","ஞெ","ஞே","ஞை","ஞொ","ஞோ","ஞௌ"],
    "ட்": ["ட","டா","டி","டீ","டு","டூ","டெ","டே","டை","டொ","டோ","டௌ"],
    "ண்": ["ண","ணா","ணி","ணீ","ணு","ணூ","ணெ","ணே","ணை","ணொ","ணோ","ணௌ"],
    "த்": ["த","தா","தி","தீ","து","தூ","தெ","தே","தை","தொ","தோ","தௌ"],
    "ந்": ["ந","நா","நி","நீ","நு","நூ","நெ","நே","நை","நொ","நோ","நௌ"],
    "ப்": ["ப","பா","பி","பீ","பு","பூ","பெ","பே","பை","பொ","போ","பௌ"],
    "ம்": ["ம","மா","மி","மீ","மு","மூ","மெ","மே","மை","மொ","மோ","மௌ"],
    "ய்": ["ய","யா","யி","யீ","யு","யூ","யெ","யே","யை","யொ","யோ","யௌ"],
    "ர்": ["ர","ரா","ரி","ரீ","ரு","ரூ","ரெ","ரே","ரை","ரொ","ரோ","ரௌ"],
    "ல்": ["ல","லா","லி","லீ","லு","லூ","லெ","லே","லை","லொ","லோ","லௌ"],
    "வ்": ["வ","வா","வி","வீ","வு","வூ","வெ","வே","வை","வொ","வோ","வௌ"],
    "ழ்": ["ழ","ழா","ழி","ழீ","ழு","ழூ","ழெ","ழே","ழை","ழொ","ழோ","ழௌ"],
    "ள்": ["ள","ளா","ளி","ளீ","ளு","ளூ","ளெ","ளே","ளை","ளொ","ளோ","ளௌ"],
    "ற்": ["ற","றா","றி","றீ","று","றூ","றெ","றே","றை","றொ","றோ","றௌ"],
    "ன்": ["ன","னா","னி","னீ","னு","னூ","னெ","னே","னை","னொ","னோ","னௌ"]
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
        duration: .4,
        ease: 'back'
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

  const AnimationControls = () => {
    return(
      <>
                <Button onClick={() => setCurrentGameState('p0')}>P0 (Initial)</Button>
          <Button onClick={() => setCurrentGameState('p25')}>P25</Button>
          <Button onClick={() => setCurrentGameState('p50')}>P50</Button>
          <Button onClick={() => setCurrentGameState('p75')}>P75</Button>
          <Button onClick={() => setCurrentGameState('p100')}>P100 (End)</Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reset to Initial
          </Button>
        </>
    )
  }

  const onUyirEzhuthuPressed = (value: number) => {
    if(meiyezhuthuPressed || meiyezhuthuPressed == 0) {
      if(uyirezhuthuPressed == value) setUyirezhuthuPressed(null);
      else {
        setUyirezhuthuPressed(value);
      }
    }else {
      setUserWord(prev => prev);
    }
  }
  
  const onMeiyezhuthuPressed = (idx: number) => {
    console.log(idx);
    setUyirezhuthuPressed(null);
    if(meiyezhuthuPressed == idx) {
      setMeiyezhuthuPressed(null);
    }else {
      setMeiyezhuthuPressed(idx)
    }
  }

  const onConfirmPressed = () => {
    if((meiyezhuthuPressed || meiyezhuthuPressed == 0) && (uyirezhuthuPressed || uyirezhuthuPressed == 0)) {
      const ui = uyirMeiyeazhuthu[meiyezhuthu[meiyezhuthuPressed]][uyirezhuthuPressed];
    }else {
      if(meiyezhuthuPressed == null) return;
      const ui = meiyezhuthu[meiyezhuthuPressed];
    }
  }

  return (
    <div className="h-full w-full flex justify-evenly lg:flex-row flex-col">
      <div className="h-full w-full flex justify-center items-center bg-blue-200/0 relative">
        <div className="flex flex-col gap-2 absolute top-4">
          <div className='flex items-center justify-center space-x-2 flex-wrap p-4'>
            {
              word?.map(w =>
              <div className="answer-box shadow-[4px_4px_0px_#000] w-[40px] h-[40px] border-2 border-black p-0.5 flex items-center justify-center relative">
                <span className='absolute h-[90%] w-[90%] bg-red-400'>{w}</span>
              </div>)
            }
          </div>
        </div>
        <div
          id="game-scene-container"
          className="flex justify-center items-center overflow-hidden max-h-[360px] max-w-[400px] p-2 border-4 border-black shadow-[4px_4px_0px_#000]"
        >
          <InitialScene currentStickMan={currentStickMan} />
        </div>
      </div>
      <div className="h-full w-full p-4 bg-red-200/0 flex justify-center items-center flex-col">
        <Keyboard
          uyirEzhuthu={uyirEzhuthu}
          meiyezhuthu={meiyezhuthu}
          onUyirEzhuthuPressed={onUyirEzhuthuPressed}
          onMeiyezhuthuPressed={onMeiyezhuthuPressed}
          uyirezhuthuPressed={uyirezhuthuPressed}
          meiyezhuthuPressed={meiyezhuthuPressed}
          onConfirmPressed={onConfirmPressed}
        />
      </div>
    </div>
  )
}
