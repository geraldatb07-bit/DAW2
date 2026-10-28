import { useState } from 'react';
import './App.css'
import type { TrackView } from './components/songs/Types/TrackView';
import { tracks } from './Data/track/track.data';
import SongCard from './components/songs/SongCard';
import HeaderCard from './components/header/HeaderCard';
import type { Like } from './components/songs/Types/likes';




const totalTracks: number = tracks.length;

// const randomUser = Math.floor(Math.random() * users.length);
// const user: User = users[randomUser];


function App() {

  const [track, setTrack] = useState<TrackView>(
    {
      ...tracks[Math.floor(Math.random() * tracks.length)],
      "reproduccions": Math.floor(Math.random() * 5000),
      "likes": {
        "like": true,
        "totalLikes": 180
      }
    }
  )

  function handleClickRandomSong() {
      const random: number = Math.floor(Math.random() * totalTracks);

      const trackRandom: TrackView = {
        ...tracks[random],
        "likes": {
          "like": true,
          "totalLikes": 180
        },
        "reproduccions": Math.floor(Math.random() * 5000),
      }

    setTrack(trackRandom);
  }

  function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        "reproduccions": prev.reproduccions + 1
      }
    }
    setTrack(tr);
  }

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {

      let increment:number = 1;

      if (prev.likes.like){
        increment = -1;
      }
      const likeObj:Like = {
        like: !prev.likes.like,
        totalLikes: prev.likes.totalLikes + increment
      }
      
      return {
        ...prev,
        "likes": likeObj
      }
    }
    setTrack(tr);
  }

  

  return (
    <>
      <h1>Spotify Songs</h1>
      <SongCard trackInfo={track} play={() => incrementarReproduccions()} like={() => gestionarLikes()} />
      <button onClick={handleClickRandomSong}>Random track</button>
    </>
  )

}

export default App
