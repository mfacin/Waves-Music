import React, { useContext } from 'react'

import { PlayerContext } from '../../contexts/PlayerContext'

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

const Song: React.FC = () => {
  const { currentSong } = useContext(PlayerContext)

  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h1>{currentSong.name}</h1>
      <p>{currentSong.artist}</p>
    </div>
  )
}

export default Song
