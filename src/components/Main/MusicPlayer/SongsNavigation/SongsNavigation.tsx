import { faBackward, faPause, faPlay, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { song, songs } from "../../../../data";
import classes from "../MusicPlayer.module.css";

const SongsNavigation = ({audioRef: audio, setCurrentSong, setCurrentSongIndex, currentSong, currentSongIndex}: songsNavigationProps) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
    const playPause = () => {
        console.log("Playing clicked! ");
        if (!isPlaying) {
            play();
        }
        else {
            pause();
        }
        setIsPlaying(!isPlaying);
    };

    const play = () => {
        if (audio.current !== null) {
            audio.current.play();
        }
    }

    const pause = () => {
        if (audio.current !== null) {
            audio.current.pause();
        }
    }

    const nextSong = () => {
        if (currentSongIndex + 1 < songs.length) {
            setCurrentSongIndex(currentSongIndex + 1);
            setCurrentSong(songs[currentSongIndex + 1]);
            if (isPlaying) {
                setIsPlaying(false);
            }
            console.log("In next");
            console.log(currentSong);
            console.log(currentSongIndex);
        } else {
            // set disabled
            alert("There is no songs left")
        }

    };

    const prevSong = () => {
        if (currentSongIndex - 1 >= 0) {
            setCurrentSongIndex(currentSongIndex - 1);
            setCurrentSong(songs[currentSongIndex - 1]);
            if (isPlaying) {
                setIsPlaying(false);
            }
            console.log("In next");
            console.log(currentSong);
            console.log(currentSongIndex);
        } else {
            // set disabled
            alert("There is no songs left")
        }

    };

    return <>
        <div className={classes["navigation-music"]}>
            <button onClick={prevSong} id="prev" className={classes["action-btn"]}>
                <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
            </button>
            <button onClick={playPause} id="play" className={classes["action-btn"]}>
                {isPlaying ? <><FontAwesomeIcon icon={faPause}></FontAwesomeIcon></> : <><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></>}
            </button>
            <button onClick={nextSong} id="next" className="action-btn">
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
    currentSong: song;
    setCurrentSong: (song: song) => void;
}
