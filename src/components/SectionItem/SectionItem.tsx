import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./SectionItem.css";
import { formatArtists } from "../../utils/displayHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setShowPlayer } from "../../store/features/playerSlice";
import { ISong } from "../../models/track-models";
import { playCurrentTrack, pauseTrack, setCurrentTrack } from "../../store/features/appSlice";

const SectionItem = ({ song }: sectionItemProps) => {
    const player = useAppSelector(state => state.player);
    const {currentTrack} = useAppSelector(state => state.app)

    const dispatch = useAppDispatch();

    const handlePlayTrack = (trackId: string | undefined) => {
        if (!player.showPlayer) {
            dispatch(setShowPlayer(true));
        }
        if (currentTrack?.song?.id === song?.id) {
            if (currentTrack?.isPlaying === false) {
                dispatch(playCurrentTrack());
            }
            else {
                dispatch(pauseTrack());
            }
        }
        else {
            dispatch(setCurrentTrack(song?.id));
            // dispatch(playCurrentTrack());
        }
    };

    return <>
        <div className="card">
            <div className="card-image">
                <img src={song?.posterUrl} alt="ima" />
            </div>
            <div className="card-info">
                <h2>{song?.name}</h2>
                <div className="aritsts">
                    {formatArtists(song?.artists)}
                </div>
            </div>
            <div className="play-icon" onClick={() => { handlePlayTrack(song?.id) }}>
                <div className="circle">
                    {(player.showPlayer && currentTrack?.song?.id === song?.id) && <div>P</div>}
                    <div className="triangle"></div>
                </div>
            </div>
            <div className="like-icon">
                <FontAwesomeIcon className="heart" icon={faHeart}></FontAwesomeIcon>
            </div>
        </div>
    </>
};

interface sectionItemProps {
    song: ISong | undefined;
}

export default SectionItem;