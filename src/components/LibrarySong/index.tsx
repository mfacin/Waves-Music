import React from 'react'

import { SongInt } from '../Song'

import './styles.scss'

interface LibrarySongProps {
  song: SongInt
}

const LibrarySong: React.FC<LibrarySongProps> = ({ song }) => {
  return (
    <div className="library-song">
      <img src={song.cover} alt={song.name} />
      <div className="library-song-information">
        <h3>{song.name}</h3>
        <p>{song.artist}</p>
      </div>
    </div>
  )
}

export default LibrarySong
