import React from 'react'

import LibrarySong from '../LibrarySong'

import { SongInt } from '../Song'

import './styles.scss'

interface LibraryProps {
  songs: Array<SongInt>
  setCurrentSong: React.Dispatch<React.SetStateAction<SongInt>>
  setSongs: React.Dispatch<React.SetStateAction<SongInt[]>>
}

const Library: React.FC<LibraryProps> = ({
  songs,
  setCurrentSong,
  setSongs,
}) => {
  return (
    <div className="library">
      <h1>Library</h1>
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
        {/* {songs.map(song => (
          <LibrarySong
            key={song.id}
            song={song}
            setCurrentSong={setCurrentSong}
          />
        ))} */}
      </div>
    </div>
  )
}

export default Library
