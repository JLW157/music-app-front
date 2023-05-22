// MusicPlayer.tsx
import { useRef, useEffect, useState } from "react";
import classes from "./MusicPlayer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { pauseTrack, playCurrentTrack, playNextTrack, playPrevTrack } from "../../../store/features/appSlice";
import DisplayInfo from "./DisplayInfo/DisplayInfo";
import ProgressBar from "./ProgressBar/ProgressBar";
import SongsNavigation from "./SongsNavigation/SongsNavigation";
import SoundController from "./SoundController/SoundController";

const MusicPlayer = () => {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.app.currentTrack);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const { connection } = useAppSelector(s => s.signalR);

  const handleLoadedData = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const incrementTrackCount = () => {
    if (connection) {
      connection.invoke("IncrementTrackCount", currentTrack?.song.id)
        .catch((error) => {
          console.log("Error incrementing track count:", error);
        });
    }
  };

  const handleEnded = () => {
    incrementTrackCount();
    dispatch(playNextTrack());
  };

  return (
    <>
      <div className={classes["playControls"]}>
        <div className={classes["music-container"]}>
          {currentTrack?.song &&
            <>
              <DisplayInfo song={currentTrack?.song} />

              <audio ref={audioRef} autoPlay src={currentTrack.song.audioUrl}
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded} />

              <div className={classes["music-control"]}>
                <SongsNavigation audioRef={audioRef} />
                <ProgressBar audioRef={audioRef} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} />
              </div>

              <SoundController audioRef={audioRef}></SoundController>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
