import React, { useState } from 'react'

import Nav from './components/Nav'
import Library from './components/Library'
import Song from './components/Song'
import Player from './components/Player'

import data from './data'

import './styles/html.scss'
import './styles/app.scss'

function App() {
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)

  return (
    <div className="App">
      <Library
        setSongs={setSongs}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isLibraryOpen={isLibraryOpen}
      />

      <main>
        <Nav
          setIsLibraryOpen={setIsLibraryOpen}
          isLibraryOpen={isLibraryOpen}
        />
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
        />
      </main>
    </div>
  )
}

export default App
