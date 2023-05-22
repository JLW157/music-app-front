import { Link } from "react-router-dom";
import { ISong } from "../../../../models/track-models";
import { formatArtists } from "../../../../utils/displayHelpers";
import classes from "../MusicPlayer.module.css";

const DisplayInfo = ({ song }: displayInfoProps) => {
  return <>
    <div className={classes["music-info"]}>
      <div className={classes["img-container"]}>
        <img src={song.posterUrl} alt="Audio poster" />
      </div>
      <div className={classes["track-info"]}>
        <Link to={`${song.artists[0]}/${song.name}`} className={classes["song-name"]}>{song.name}</Link>
        <span className={classes["aritsts"]}>
          {formatArtists(song.artists)}
        </span>
      </div>
    </div>
  </>
};

export default DisplayInfo;

interface displayInfoProps {
  song: ISong;
}