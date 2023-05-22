import { faBackward, faPause, faPlay, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import classes from "../MusicPlayer.module.css";
import { ISong } from "../../../../models/track-models";
import { playCurrentTrack, pauseTrack, playNextTrack, playPrevTrack } from "../../../../store/features/appSlice";

const SongsNavigation = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
    const dispatch = useAppDispatch();

    const currentTrack = useAppSelector((state) => state.app.currentTrack);

    useEffect(() => {
        if (!currentTrack?.isPlaying) {
          audioRef.current?.play();
        } else {
          audioRef.current?.pause();
        }
      }, [audioRef, currentTrack?.isPlaying])

      const toggleButton = () => {
        console.log(`Handling playing track, app current id: ${currentTrack?.song?.id} | IsPlaying: ${currentTrack?.isPlaying}`);
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

    const isPlaying = useAppSelector(state => state.app.currentTrack?.isPlaying);

    return <>
        <div className={classes["navigation-music"]}>
            <button onClick={handlePlayPrev} id="prev" className={classes["action-btn"]}>
                <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
            </button>
            <button onClick={toggleButton} id="play" className={classes["action-btn"]}>
                {isPlaying ? <><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></> : <><FontAwesomeIcon icon={faPause}></FontAwesomeIcon></>}
            </button>
            <button onClick={handlePlayNext} id="next" className={classes["action-btn"]}>
                <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
            </button>
        </div>
    </>
};

export default SongsNavigation;

interface songsNavigationProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    currentSongIndex: number;
    setCurrentSongIndex: (songIndex: number) => void;
    currentSong: ISong;
    setCurrentSong: (song: ISong) => void;
}
