import React, { useState } from 'react'

import Nav from './components/Nav'
import Library from './components/Library'
import Song from './components/Song'
import Player from './components/Player'

import PlayerProvider from './contexts/PlayerContext'

import './styles/html.scss'
import './styles/app.scss'

function App() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <PlayerProvider>
      <div className={`app ${isDarkMode ? 'dark' : ''}`}>
        <Library
          isLibraryOpen={isLibraryOpen}
          setIsLibraryOpen={setIsLibraryOpen}
        />

        <main>
          <Nav
            isLibraryOpen={isLibraryOpen}
            setIsLibraryOpen={setIsLibraryOpen}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <Song />
          <Player />
        </main>
      </div>
    </PlayerProvider>
  )
}

export default App
