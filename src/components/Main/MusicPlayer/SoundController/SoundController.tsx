import { faVolumeHigh, faVolumeUp, faVolumeLow, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classes from "../MusicPlayer.module.css";

const SoundController = ({ audioRef: audio, }: soundControllerProps) => {

    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [prevVolume, setPrevVolume] = useState<number>(0.81);
    const [audioVolume, setAudioVolume] = useState<number>(0.81);

    const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        if (isMuted && value > 0) {
            setIsMuted(false);
        }
        console.log("On change volume ", value);
        changeVolume(value);
    };

    const muteClick = () => {
        if (isMuted) {
            changeVolume(prevVolume);
        }
        else {
            changeVolume(0);
        }
        setIsMuted(!isMuted);
    };

    const changeVolume = (volume: number) => {
        setPrevVolume(audioVolume);
        setAudioVolume(volume);
        if (audio.current) {
            audio.current.volume = volume;
        }
    }

    return <>
        <div className={classes["sound-mixer"]}>
            <div className={classes["sound-mixer-row"]}>
                <button onClick={muteClick} className={classes["sound-btn"]}>
                    {isMuted === false ? <>
                        {(audioVolume <= 1 && audioVolume >= 0.79) && <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon>}
                        {(audioVolume < 0.79 && audioVolume > 0.34) && <FontAwesomeIcon icon={faVolumeUp} />}
                        {(audioVolume <= 0.34 && audioVolume >= 0.01) && <FontAwesomeIcon icon={faVolumeLow}></FontAwesomeIcon>}
                        {audioVolume === 0 && <FontAwesomeIcon icon={faVolumeXmark}></FontAwesomeIcon>}
                    </> : <>
                        {audioVolume === 0 && <FontAwesomeIcon icon={faVolumeXmark}></FontAwesomeIcon>}
                    </>}

                </button>
                <input onChange={onVolumeChange} type="range" id="sound-range" min="0" max="1" step="0.01" value={audioVolume} />
            </div>
        </div>
    </>
};

interface soundControllerProps {
    audioRef: React.RefObject<HTMLAudioElement>;
}

export default SoundController;