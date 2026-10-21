import './App.css'
import SongCard from './components/SongCard'
import type { TrackView } from './components/Types/TrackView';
import { tracks } from './Data/track/track.data';
import type { Track } from './Model/Track';


function App() {
  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random]
  
  const totalReproduccions: TrackView = {
    ...track,
    "reproduccions": Math.floor(Math.random() * 1000)
  };
  
  return (
    <>
      <SongCard trackInfo={totalReproduccions} />
    </>
  )
}

export default App
