import React, { useContext } from 'react'

import Nav from './components/Nav'
import Library from './components/Library'
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

      <main>
        <Nav />
        <Song />
        <Player />
      </main>
    </div>
  )
}

export default App
