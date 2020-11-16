import React from 'react'

import LibrarySong from '../LibrarySong'

import { SongInt } from '../Song'

import './styles.scss'

interface LibraryProps {
  songs: Array<SongInt>
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong song={song} />
        ))}
        {songs.map(song => (
          <LibrarySong song={song} />
        ))}
        {songs.map(song => (
          <LibrarySong song={song} />
        ))}
      </div>
    </div>
  )
}

export default Library
