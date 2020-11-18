import React from 'react'

import LibrarySong from '../LibrarySong'

import { SongInt } from '../Song'

import './styles.scss'

interface LibraryProps {
  isLibraryOpen: boolean
  songs: Array<SongInt>
  setCurrentSong: React.Dispatch<React.SetStateAction<SongInt>>
  setSongs: React.Dispatch<React.SetStateAction<SongInt[]>>
}

const Library: React.FC<LibraryProps> = ({
  isLibraryOpen,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  return (
    <div className={`library ${isLibraryOpen ? 'open' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
