import React, { useContext } from 'react'

import { AppContext } from '../../contexts/AppContext'
import { PlayerContext } from '../../contexts/PlayerContext'

import { SongInt } from '../Song'

import './styles.scss'

interface LibrarySongProps {
  song: SongInt
}

const LibrarySong: React.FC<LibrarySongProps> = ({ song }) => {
  const { handleChangeCurrentSong } = useContext(PlayerContext)
  const { handleToggleLibraryOpen } = useContext(AppContext)

  const handleSongSelect = async () => {
    if (window.innerWidth <= 768) {
      handleToggleLibraryOpen()
    }

    handleChangeCurrentSong(song)
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
