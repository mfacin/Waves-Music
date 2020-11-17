import React from 'react'

import { SongInt } from '../Song'

import './styles.scss'

interface LibrarySongProps {
  song: SongInt
  songs: Array<SongInt>
  setCurrentSong: React.Dispatch<React.SetStateAction<SongInt>>
  setSongs: React.Dispatch<React.SetStateAction<SongInt[]>>
}

const LibrarySong: React.FC<LibrarySongProps> = ({ song, setCurrentSong }) => {
  const handleSongSelect = async () => {
    setCurrentSong(song)
  }

  return (
    <div
      className={`library-song ${song.active ? 'active' : ''}`}
      onClick={handleSongSelect}
    >
      <img src={song.cover} alt={song.name} />
      <div className="library-song-information">
        <h3>{song.name}</h3>
        <p>{song.artist}</p>
      </div>
    </div>
  )
}

export default LibrarySong
