import { song } from "../../../../data";
import classes from "../MusicPlayer.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";

const DisplayInfo = ({ song, audioRef: audio, currentTime, duration, setCurrentTime, setDuration }: displayInfoProps) => {
  return <>
    <div className={classes["music-info"]}>
      <div className={classes["img-container"]}>
        <img src={"Playboi-Carti-Stop-Breathing-MP3-.jpg"} alt="Audio poster" />
      </div>
      <div className={classes["track-info"]}>
        <h4 className={classes["song-name"]}>{song.title}</h4>
        <a className={classes["artist"]} href="#!">Playboi Carti</a>
      </div>
    </div>
  </>
};

export default DisplayInfo;

interface displayInfoProps {
  song: song;
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTime: number,
  duration: number,
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}