import './App.css'
import HeaderCard from './components/header/Header';
import type { HeaderView } from './components/header/Types/HeaderView';
import SongCard from './components/songs/SongCard'
import type { TrackView } from './components/songs/Types/TrackView';
import { tracks } from './Data/track/track.data';
import { users } from './Data/track/user.data';
import type { Track } from './Model/Track';
import type { User } from './Model/User';


function App() {
  const totalTracks: number = tracks.length;
  const randomTrack: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[randomTrack]

  const randomUser = Math.floor(Math.random() * users.length);
  const user: User = users[randomUser];



  const totalReproduccions: TrackView = {
    ...track,
    "reproduccions": Math.floor(Math.random() * 1000)
  };

  const data: HeaderView = {
    ...user,
    "data": new Date().toLocaleDateString('ca-ES')
  };



  return (
    <>
      <h1>Spotify Songs</h1>
      <SongCard trackInfo={totalReproduccions} />
      <HeaderCard headerInfo={data}/>
    </>
  )
}

export default App
