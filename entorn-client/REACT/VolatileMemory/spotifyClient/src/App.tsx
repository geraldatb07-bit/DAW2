import { useState } from 'react';
import './App.css'
import type { TrackView } from './components/songs/Types/TrackView';
import { tracks } from './Data/track/track.data';
import SongCard from './components/songs/SongCard';
import type { Like } from './components/songs/Types/likes';
import HeaderCard from './components/header/HeaderCard';
import PlayingCard from './components/playing/PlayingCard';
import ListSongs from './components/songs/ListSongs';
import type { TrackListView } from './components/songs/Types/TrackListView';
import type { HistoryView } from './components/history/Types/HistoryView';
import HistoryCard from './components/history/HistoryCard';

export function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds}`;
}


function App() {

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

  const [isPlaying, setIsPlaying] = useState(false);

  const [history, setHistory] = useState<HistoryView[]>([]);


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
    setHistory([]);
  }


  function gestionarReproduccio() {
    if (!isPlaying) {
      incrementarReproduccions();
      afegirAlHistorial(track);
    }

    setIsPlaying(!isPlaying);
  }

  function afegirAlHistorial(song: {title: string, artist: string, duration: number}) {
    setHistory(prev => [
      {
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        playedTime: new Date().toLocaleString('ca-ES')
      },
      ...prev
    ]);
  }


  function handleListTrackPlay(selectedTrack: TrackListView) {
    setTrack({
      ...selectedTrack,
      reproduccions: 1,
      likes: { like: false, totalLikes: 0 }
    });
    setIsPlaying(true);
    afegirAlHistorial(selectedTrack);
  }

  return (
    <>
        <main>
            <table>
                <thead>
                    <title>ListSong</title>
                </thead>
                <tbody>
                  <ListSongs 
                    tracks={tracks} 
                    onPlay={handleListTrackPlay}
                    isPlaying={isPlaying}
                    playingTrackId={track.id} />
                </tbody>
            </table>
            <HistoryCard history={history} />
            <aside>
          <HeaderCard
            headerInfo={{
              nom: 'Gerald',
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
            onStop={() => setIsPlaying(false)}
          ></PlayingCard>
            </aside>
        </main>
    </>
  )

}

export default App
