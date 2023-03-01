import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./SectionItem.css";
import { formatArtists } from "../../utils/displayHelpers";

const SectionItem = (props: sectionItemProps) => {

    return <>
        <div className="card">
            <div className="card-image">
                <img src={props.poster} alt="ima" />
            </div>
            <div className="card-info">
                <h2>{props.title}</h2>
                <div className="aritsts">
                    {formatArtists(props.artitsts)}
                </div>
            </div>
            <div className="play-icon" onClick={() => {props.onPlayClick(props.songId)}}>
                <div className="circle">
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
    poster: string;
    title: string;
    artitsts: string[];
    onPlayClick: (songId: number) => void;
    songId: number
}

export default SectionItem;