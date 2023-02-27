import { song } from "../../../../data";
import classes from "../MusicPlayer.module.css";

const DisplayInfo = ({song} : displayInfoProps) => {
    return <>
        <div className={classes["music-info"]}>
          <div className={classes["img-container"]}>
            <img src={"Playboi-Carti-Stop-Breathing-MP3-.jpg"} alt="Audio poster" />
          </div>
          <h4>{song.title}</h4>
        </div>
    </>
};

export default DisplayInfo;

interface displayInfoProps {
    song: song;
}