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
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}

export default Song
