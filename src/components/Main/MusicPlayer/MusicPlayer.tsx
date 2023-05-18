// MusicPlayer.tsx
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { pauseTrack, playCurrentTrack, playNextTrack, playPrevTrack, setTrack } from "../../../store/features/appSlice";

const MusicPlayer = () => {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.app.currentTrack);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentTrack?.song && audioRef.current) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }, [currentTrack?.song]);

  useEffect(() => {
    if (!currentTrack?.isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [currentTrack?.isPlaying])

  const toggleButton = () => {
    if (!currentTrack?.isPlaying) {
      dispatch(playCurrentTrack());
    }
    else {
      dispatch(pauseTrack());
    }
  };

  const handlePlayNext = () => {
    dispatch(playNextTrack());
  };

  const handlePlayPrev = () => {
    dispatch(playPrevTrack());
  };

  return (
    <div>
      {currentTrack?.song && (
        <div>
          <h3>Now Playing: {currentTrack.song.name}</h3>
          <audio ref={audioRef} src={currentTrack.song.audioUrl} controls autoPlay />
        </div>
      )}
      <button onClick={toggleButton}>{currentTrack?.isPlaying ? "PLay" : "Pause"}</button>
      <button onClick={handlePlayPrev}>Previous</button>
      <button onClick={handlePlayNext}>Next</button>
    </div>
  );
};

export default MusicPlayer;
