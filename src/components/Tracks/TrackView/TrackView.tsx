import { Link } from "react-router-dom";
import { ISong } from "../../../models/track-models";

interface ITrackViewProps {
    track: ISong | undefined;
}

const TrackView = ({ track }: ITrackViewProps) => {

    return <>
        {track &&
            <div className="track-info">
                <div className="track-info-header">
                    <div className="track-image">
                        <img src={track.posterUrl} />
                    </div>
                    <div className="track-info-content">
                        <h3>{track.name}</h3>
                        <div className="track-info-content-more">
                            <Link to={"/"}>{track.artists[0]}</Link>
                            <span> | </span>
                            <span>2012</span>
                            <span> | </span>
                            <span>3:31</span>
                        </div>
                    </div>
                </div>
                <div className="track-info-main-content">
                    <div className="track-info-main-content-play-button">

                    </div>
                    <div className="track-info-main-content-like-button">

                    </div>
                </div>
            </div>
        }
    </>
};

export default TrackView;