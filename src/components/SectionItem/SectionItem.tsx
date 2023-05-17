import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./SectionItem.css";
import { formatArtists } from "../../utils/displayHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { pauseMusic, playMusic, setShowPlayer } from "../../store/features/playerSlice";
import { ISong } from "../../models/track-models";

const SectionItem = ({song}: sectionItemProps) => {
    const {showPlayer, isPlaying, currentSong} = useAppSelector(state => state.player);

    const dispatch = useAppDispatch();

    function handleClick(){
        if (!showPlayer) {
            dispatch(setShowPlayer(true));
        }
        if (isPlaying) {
            dispatch(pauseMusic());
        }
        else{
            dispatch(playMusic(song));        
        }
    }
    
    return <>
        <div className="card">
            <div className="card-image">
                <img src={song.posterUrl} alt="ima" />
            </div>
            <div className="card-info">
                <h2>{song.name}</h2>
                <div className="aritsts">
                    {formatArtists(song.artists)}
                </div>
            </div>
            <div className="play-icon" onClick={() => {handleClick()}}>
                <div className="circle">
                    {(isPlaying && currentSong?.id === song.id) && <div>P</div>}
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
    song: ISong;
}

export default SectionItem;