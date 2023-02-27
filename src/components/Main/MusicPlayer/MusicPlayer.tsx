import { useRef, useState } from "react";
import classes from "./MusicPlayer.module.css";
import { song, songs } from "../../../data";
import ProgressBar from "./ProgressBar/ProgressBar";
import SoundController from "./SoundController/SoundController";
import SongsNavigation from "./SongsNavigation/SongsNavigation";
import DisplayInfo from "./DisplayInfo/DisplayInfo";

const MusicPlayer = () => {
  // const [songsData, setSongs] = useState<song[]>(songs);

  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<song>(songs[currentSongIndex]);

  const audio = useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleLoadedData = () => {
    setDuration(audio.current?.duration || 0);
  };

  const handleTimeUpdate = () => {
    console.log(audio.current?.currentTime);
    setCurrentTime(audio.current?.currentTime || 0);
  };


  return <>
    <div className={classes["playControls"]}>
      <div className={classes["music-container"]}>
        <DisplayInfo song={currentSong} />
        <ProgressBar audioRef={audio} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} />

        <audio ref={audio} src={currentSong.url}
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate} id="audio" />

        <SongsNavigation audioRef={audio}
          currentSong={currentSong}
          currentSongIndex={currentSongIndex}
          setCurrentSong={setCurrentSong}
          setCurrentSongIndex={setCurrentSongIndex} />

        <SoundController audioRef={audio}></SoundController>
      </div>
    </div>
  </>
};

export default MusicPlayer;