import { useState } from 'react';
import './App.css'
import type { TrackView } from './components/songs/Types/TrackView';
import SongCard from './components/songs/SongCard';
import type { Like } from './components/songs/Types/likes';
import HeaderCard from './components/header/HeaderCard';
import PlayingCard from './components/playing/PlayingCard';
import ListSongs from './components/songs/ListSongs';
import type { Track } from './Model/Track';




function App() {

  const[tracks, setTracks] = useState<Track[]>([]);

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

  async function carregarDadesTrack(){

    const resposta: Response = await fetch("http://localhost:3000/tracks");
    const listTrack: Track[] = await resposta.json() as Track[];
    setTracks(listTrack)
  }
  

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
            :<p>
              <button onClick={carregarDadesTrack}>Carregar Tracks</button>
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
            onStop={() => setIsPlaying(false)}
          ></PlayingCard>
        </aside>
        </main>
    </>
  )

}

export default App
