import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import MainLayout from '@/layouts/main-layout'
import HomeScreen from '@/screens/home-screen'
import GameScreen from '@/screens/game-screen'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const onStartClicked = () => setCurrentScreen(<GameScreen />)

  const [currentScreen, setCurrentScreen] = useState<React.JSX.Element>(
    <HomeScreen onStart={onStartClicked} />,
  )

  return <MainLayout children={currentScreen} />
}
