import React from 'react'
import { X } from 'react-feather'

import LibrarySong from '../LibrarySong'

import { SongInt } from '../Song'

import './styles.scss'

interface LibraryProps {
  isLibraryOpen: boolean
  songs: Array<SongInt>
  setCurrentSong: React.Dispatch<React.SetStateAction<SongInt>>
  setSongs: React.Dispatch<React.SetStateAction<SongInt[]>>
  setIsLibraryOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Library: React.FC<LibraryProps> = ({
  isLibraryOpen,
  songs,
  setCurrentSong,
  setSongs,
  setIsLibraryOpen,
}) => {
  return (
    <div className={`library ${isLibraryOpen ? 'open' : ''}`}>
      <div className="title">
        <h2>Library</h2>
        <X onClick={() => setIsLibraryOpen(false)} />
      </div>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            setIsLibraryOpen={setIsLibraryOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
