import { useRef, useState } from "react";
import classes from "./MusicPlayer.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import SoundController from "./SoundController/SoundController";
import SongsNavigation from "./SongsNavigation/SongsNavigation";
import DisplayInfo from "./DisplayInfo/DisplayInfo";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { nextTrack } from "../../../store/features/playerSlice";

const MusicPlayer = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  const { currentSong, isPlaying, songs } = useAppSelector(state => state.player);

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
        {currentSong &&
          <>
            <DisplayInfo song={currentSong} />

            <audio ref={audio} autoPlay={isPlaying} src={currentSong.audioUrl}
              onLoadedData={handleLoadedData}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                dispatch(nextTrack());
              }}/>

            <div className={classes["music-control"]}>
              <SongsNavigation audioRef={audio} />
              <ProgressBar audioRef={audio} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} />
            </div>

            <SoundController audioRef={audio}></SoundController>
          </>
        }
      </div>
    </div>
  </>
};

export default MusicPlayer;