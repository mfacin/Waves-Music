import React from 'react'

import './styles.scss'

export interface SongInt {
  name: string
  cover: string
  artist: string
  audio: string
  color: [string, string]
  id: string
  active: boolean
}

interface SongProps {
  currentSong: SongInt
}

const Song: React.FC<SongProps> = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h1>{currentSong.name}</h1>
      <p>{currentSong.artist}</p>
    </div>
  )
}

export default Song
