import { Link } from "react-router-dom";
import { IAudioSearchResponse, ISearchItem } from "../../../../models/track-models";
import "./MusicSearchItem.css";
import Waveform from "../../../WaveForm/WaveForm";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { pauseTrack, playCurrentTrack, setCurrentTrack } from "../../../../store/features/appSlice";
import { setShowPlayer } from "../../../../store/features/playerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus, faHeart, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../../../contexts/ModalContext";
import AddToPlaylist from "../../../Playlists/AddToPlaylist";

const MusicSearchItem = (s: { audio?: IAudioSearchResponse }) => {
    console.log("MusciSearch item -", s);
    const player = useAppSelector(s => s.player);
    const app = useAppSelector(s => s.app);
    const dispatch = useAppDispatch();

    const [showControl, setShowControl] = useState<boolean>(false);

    const { showModal, isModalShown, typeOfModal } = useContext(ModalContext);


    return <>
        <li className="music-list-item" onMouseEnter={() => setShowControl(true)} onMouseLeave={(() => setShowControl(false))}>
            <div className="music-item">
                <Link className="music-item-link" to={s.audio?.itemRelativeUrl ?? "/"}>
                    <div className="music-item-img">
                        <img src={s.audio?.posterUrl} alt="Artist" />
                    </div>
                </Link>
                <div className="music-item-content">
                    <h2>{s.audio?.name}</h2>
                </div>
                <div className="music-item-control">

                    {showControl ?
                        <div className="control-buttons">
                            <button className="control-button" onClick={() => {
                                showModal({
                                    showModal: true,
                                    typeOfModal: "AddToPlaylist",
                                    children: <>
                                        <h2>Add modal</h2>
                                        <AddToPlaylist audioId={s.audio?.id}/>
                                    </>
                                });
                            }}><FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon></button>
                            <button className="control-button" onClick={() => {
                                // showModal({
                                //     showModal: true,
                                //     typeOfModal: "AddToPlaylist",
                                //     children: <>
                                //         <div>
                                //             <h2>Add modal</h2>

                                //         </div>
                                //     </>
                                // });
                            }}><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></button>
                        </div>
                        : <h2>{s.audio?.playedCount} <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon></h2>
                    }
                </div>
            </div>
        </li>
    </>
};

export default MusicSearchItem;