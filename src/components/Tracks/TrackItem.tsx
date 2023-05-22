import { useState, useRef, useEffect } from "react";
import { ISong } from "../../models/track-models";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setShowPlayer } from "../../store/features/playerSlice";
import { pauseTrack, playCurrentTrack, setCurrentTrack, setNewCountForTrack } from "../../store/features/appSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import * as signalR from "@microsoft/signalr";
import { trackCountSignalRUrl } from "../../utils/endpoints";
import TrackCount from "./TrackCount";
import { Link } from "react-router-dom";

interface ITrackItemProps {
    s: ISong;
    index: number;
}

const TrackItem = ({ s, index}: ITrackItemProps) => {
    const { connection } = useAppSelector(s => s.signalR);

    const [hovered, setHovered] = useState<boolean>(false);

    const { player, app } = useAppSelector(s => s);
    const dispatch = useAppDispatch();

    const handlePlayTrack = (trackId: string | undefined) => {
        if (!player.showPlayer) {
            dispatch(setShowPlayer(true));
        }
        console.log(`Handling playing track, TrackId: ${trackId} |  app current id: ${app.currentTrack?.song?.id} | IsPlaying: ${app.currentTrack?.isPlaying}`);

        if (app.currentTrack?.song?.id === s.id) {
            if (app.currentTrack?.isPlaying === false) {
                dispatch(playCurrentTrack());
            }
            else {
                dispatch(pauseTrack());
            }
        }
        else {
            dispatch(setCurrentTrack(s.id));
            // dispatch(playCurrentTrack());
        }
    };

    return (
        <>
            <div className="sound">
                <div className="sound-item-row">
                    <div
                        className={`sound-item-img-wrapper ${hovered ? "hovered" : ""}`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <div className="sound-item-img">
                            <img src={s.posterUrl} height="30" width="30" alt="" />
                        </div>
                        <div className="sound-item-playbutton" onClick={() => {
                            handlePlayTrack(s.id)
                        }}>
                            <div className="circle-button">
                                {app.currentTrack?.isPlaying ?
                                    <>
                                        {app.currentTrack.song?.id === s.id ? <FontAwesomeIcon icon={faPause} style={{ color: "#000000", height: "20px", width: "20px" }} /> : <FontAwesomeIcon icon={faPlay} style={{ color: "#000000" }} />}
                                    </>
                                    : <FontAwesomeIcon icon={faPlay} style={{ color: "#000000" }} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="sound-item-number">
                        <span>{index}</span>
                    </div>
                    <div className="sound-item-content">
                        <Link to={`/${s.artists[0]}`}>{s.artists[0]}</Link>
                        <span>-</span>
                        <Link to={`/${s.artists[0]}/${s.name}`}>{s.name}</Link>
                    </div>
                    <div className="sound-item-additional">
                        <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                        <TrackCount className="sound-item-playcount" track={s} />
                    </div>
                </div>
            </div>
            {/* <audio ref={audioRef} src={s.audioUrl} autoPlay={false} /> */}
        </>
    );
};

export default TrackItem;
