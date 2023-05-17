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
        <h4 className={classes["song-name"]}>{song.name}</h4>
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