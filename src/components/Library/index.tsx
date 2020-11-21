import React, { useContext } from 'react'
import { X } from 'react-feather'

import { AppContext } from '../../contexts/AppContext'
import { PlayerContext } from '../../contexts/PlayerContext'

import LibrarySong from '../LibrarySong'

import './styles.scss'

const Library: React.FC = () => {
  const { songs } = useContext(PlayerContext)
  const { isLibraryOpen, handleToggleLibraryOpen } = useContext(AppContext)

  return (
    <div className={`panel left ${isLibraryOpen ? 'open' : ''}`}>
      <div className="title">
        <h2>Library</h2>
        <button onClick={handleToggleLibraryOpen}>
          <X />
        </button>
      </div>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong key={song.id} song={song} />
        ))}
      </div>
    </div>
  )
}

export default Library
