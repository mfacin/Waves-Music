import React, { useState } from 'react'
import './styles/html.scss'

import Library from './components/Library'
import Song from './components/Song'
import Player from './components/Player'

import data from './data'

function App() {
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
      <Library
        setSongs={setSongs}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
    </div>
  )
}

export default App
