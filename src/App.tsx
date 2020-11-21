import React, { useContext } from 'react'

import Library from './components/Library'
import Settings from './components/Settings'
import Nav from './components/Nav'
import Song from './components/Song'
import Player from './components/Player'

import { AppContext } from './contexts/AppContext'

import './styles/html.scss'
import './styles/app.scss'

function App() {
  const { isDarkMode } = useContext(AppContext)

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Library />
      <Settings />

      <main>
        <Nav />
        <Song />
        <Player />
      </main>
    </div>
  )
}

export default App
