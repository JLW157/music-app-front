import { song } from "../../../../data";
import { formatArtists } from "../../../../utils/displayHelpers";
import classes from "../MusicPlayer.module.css";

const DisplayInfo = ({ song}: displayInfoProps) => {
  return <>
    <div className={classes["music-info"]}>
      <div className={classes["img-container"]}>
        <img src={song.poster} alt="Audio poster" />
      </div>
      <div className={classes["track-info"]}>
        <h4 className={classes["song-name"]}>{song.title}</h4>
        <a className={classes["artist"]} href="#!">{formatArtists(song.artists)}</a>
      </div>
    </div>
  </>
};

export default DisplayInfo;

interface displayInfoProps {
  song: song;
}