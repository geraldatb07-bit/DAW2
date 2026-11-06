import { useEffect, useState } from 'react';
import './App.css'
import type { TrackView } from './components/songs/Types/TrackView';
import SongCard from './components/songs/SongCard';
import type { Like } from './components/songs/Types/likes';
import HeaderCard from './components/header/HeaderCard';
import PlayingCard from './components/playing/PlayingCard';
import ListSongs from './components/songs/ListSongs';
import { ENV } from './Config/env';
import type { GETTrack } from './APIManagement/Tracks/Interfaces/Track';
import type { AddHistory } from './APIManagement/History/Interfaces/HistoryCreate';




function App() {

  const [tracks, setTracks] = useState<GETTrack[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [track, setTrack] = useState<TrackView>(
    {
      ...tracks[Math.floor(Math.random() * tracks.length)],
      "reproduccions": Math.floor(Math.random() * 5000),
      "likes": {
        "like": false,
        "totalLikes": 0
      }
    }
  )

  async function carregarDadesTrack() {
    const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
    const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
    setTracks(listTrack)
  }

  useEffect(
    () => {
      carregarDadesTrack();
    }, []
  )

  function handleClickRandomSong() {
    const random: number = Math.floor(Math.random() * tracks.length);

    const trackRandom: TrackView = {
      ...tracks[random],
      "likes": {
        "like": false,
        "totalLikes": 0
      },
      "reproduccions": Math.floor(Math.random() * 5000),
    }

    setTrack(trackRandom);
  }

  async function incrementarReproduccions() {
    const tr = (prev: TrackView): TrackView => {
      return {
        ...prev,
        "reproduccions": prev.reproduccions + 1
      }
    }
    const newHistory: AddHistory = {
      user: "C2CFE8EE-F0CF-4C57-A256-E3495D7CA7BC",
      track: tracks[0].id
    }
    const response: Response = await fetch(
      "http://localhost:3000/tracks/user/history",
      {
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify(newHistory)
      })
      if(!response.ok){
        return false
      }
      const result = await response.json();
      console.log(result)
    setTrack(tr);
  }

  function gestionarLikes() {
    const tr = (prev: TrackView): TrackView => {

      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;
      }
      const likeObj: Like = {
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

  function handleClickReset() {
    setTrack(prev => ({
      ...prev,
      reproduccions: 0,
      likes: {
        like: false,
        totalLikes: 0
      }
    }));
  }


  function gestionarReproduccio() {
    if (!isPlaying) {
      incrementarReproduccions();
    }

    setIsPlaying(!isPlaying);
  }


  return (
    <>
      <main>
        {
          tracks.length > 0 ?
            <table>
              <thead>
                <title>ListSong</title>
              </thead>
              <tbody>
                <ListSongs tracks={tracks} />
              </tbody>
            </table>
            : <p>
              No track  available
            </p>
        }

        <aside>
          <HeaderCard
            headerInfo={{
              nom: 'Gerard',
              data: new Date().toLocaleString('ca-ES')
            }}
          />
          <h1>Spotify Songs</h1>
          <SongCard trackInfo={track}
            play={() => gestionarReproduccio()}
            like={() => gestionarLikes()}
            reset={handleClickReset} />
          <button onClick={handleClickRandomSong}>Random track</button>
          <hr />
          <PlayingCard
            isPlaying={isPlaying}
            trackInfo={track}
            onStop={() => setIsPlaying(false)} />
        </aside>
      </main>
    </>
  )

}

export default App
