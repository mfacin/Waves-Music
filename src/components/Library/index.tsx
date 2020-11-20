import React, { useContext } from 'react'
import { X } from 'react-feather'
import { PlayerContext } from '../../contexts/PlayerContext'

import LibrarySong from '../LibrarySong'

import './styles.scss'

interface LibraryProps {
  isLibraryOpen: boolean
  setIsLibraryOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Library: React.FC<LibraryProps> = ({
  isLibraryOpen,
  setIsLibraryOpen,
}) => {
  const { songs } = useContext(PlayerContext)

  return (
    <div className={`library ${isLibraryOpen ? 'open' : ''}`}>
      <div className="title">
        <h2>Library</h2>
        <button onClick={() => setIsLibraryOpen(false)}>
          <X />
        </button>
      </div>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            song={song}
            setIsLibraryOpen={setIsLibraryOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
