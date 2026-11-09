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
import type { GETPlaylist } from './APIManagement/Playlists/Interfaces/Playlist';
import PlaylistCard from './components/playlists/PlaylistCard';



function App() {

  const [tracks, setTracks] = useState<GETTrack[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);

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

    setTracks(listTrack);

    if (listTrack.length > 0) {
      setTrack({
        ...listTrack[0],
        reproduccions: 0,
        likes: {
          like: false,
          totalLikes: 0
        }
      });
    }
  }

  async function carregarDadesPlaylist() {
    const resposta = await fetch(`${ENV.API_BASE_URL}/playlists`);

    if (!resposta.ok) {
      throw new Error("Error en carregar les playlists");
    }

    const llista: GETPlaylist[] = await resposta.json();
    setPlaylists(llista);
  }

  useEffect(
    () => {
      carregarDadesTrack();
    }, []
  )

  useEffect(
    () => {
      carregarDadesPlaylist();
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

    setTrack(tr);

    const newHistory: AddHistory = {
      user: "C2CFE8EE-F0CF-4C57-A256-E3495D7CA7BC",
      track: tracks[0].id
    }

    const response: Response = await fetch(
      "http://localhost:3000/tracks/user/history",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newHistory)
      })
    if (!response.ok) {
      return false
    }
    const result = await response.json();
    console.log(result)
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


  function handlePlayTrack(selectedTrack: GETTrack): void {
    setTrack({
      ...selectedTrack,
      reproduccions: 0,
      likes: {
        like: false,
        totalLikes: 0
      }
    });

    setIsPlaying(true);
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
                <ListSongs 
                tracks={tracks}
                onPlayTrack={handlePlayTrack} 
                />
              </tbody>
            </table>
            : <p>
              No track  available
            </p>
        }
        <div className="library-component">
          {tracks.length > 0 ? (
            <table>
              <thead>
                <title>ListSong</title>
              </thead>
              <tbody>
                <ListSongs tracks={tracks} onPlayTrack={handlePlayTrack} />
              </tbody>
            </table>
          ) : (
            <p>No track available</p>
          )}

          <PlaylistCard playlists={playlists} />
        </div>
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
          <hr style={{ width: "50%", marginLeft: "0" }} />
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
