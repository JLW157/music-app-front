import { faBackward, faPause, faPlay, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ISong } from "../../../../data";
import { nextTrack, prevTrack, playMusic, pauseMusic } from "../../../../store/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import classes from "../MusicPlayer.module.css";

const SongsNavigation = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
    const dispatch = useAppDispatch();

    const { currentSong, isPlaying, songs } = useAppSelector(state => state.player);

    const handleNext = () => {
        dispatch(nextTrack());
    };

    const handlePrevious = () => {
        dispatch(prevTrack());
    };

    const handleTogglePlay = () => {
        
        console.log("in toggle play");

        if (currentSong) {
            console.log("Curreent song", currentSong);
            if (!isPlaying) {
                console.log("is Playing", isPlaying);
                dispatch(playMusic(currentSong));
                audioRef.current?.play();
            }
            else{
                console.log("Pausing");
                dispatch(pauseMusic())
                audioRef.current?.pause();
            }
        }
    }
    return <>
        <div className={classes["navigation-music"]}>
            <button onClick={handlePrevious} id="prev" className={classes["action-btn"]}>
                <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
            </button>
            <button onClick={handleTogglePlay} id="play" className={classes["action-btn"]}>
                {isPlaying ? <><FontAwesomeIcon icon={faPause}></FontAwesomeIcon></> : <><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></>}
            </button>
            <button onClick={handleNext} id="next" className={classes["action-btn"]}>
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
