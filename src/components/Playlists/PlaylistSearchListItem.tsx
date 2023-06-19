import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./PlaylistSearchList.module.css"
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { ISong } from "../../models/track-models";
import { ISetDTO } from "../../models/set.models";
import { useEffect, useState } from "react";
import axios from "axios";
import { addAudioToSetUrl } from "../../utils/endpoints";
import { addAudioToSet, removeAudioFromSet } from "../../services/sert.service";

interface IPlalistSearchListItem {
    s: ISetDTO
    audioId: string;
}

const PlaylistSearchListItem = ({ s, audioId }: IPlalistSearchListItem) => {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setShowAdd(s.audios.findIndex(x => x.id === audioId) > -1);
    }, []);

    const onAddClick = async (setId: string, audioId: string) => {
        console.log("[ADD] - Current info", setId, audioId);

        // http request 
        // loading state
        setLoading(true);
        try {
            const res = await addAudioToSet({ setId, audioId });
            s.audios.push(res.data);
            setShowAdd(false);
            setLoading(false);
            return;
        } catch (error) {
            setShowAdd(true);
        }
    };
    
    const onRemoveClick = async (setId: string, audioId: string) => {
        // http request 
        // loading state
        setLoading(true);
        try {
            const res = await removeAudioFromSet({ setId, audioId });
            s.audios = s.audios.filter(song => song.id !== res.data.id);
            setLoading(false);
            
            return;
        } catch (error) {
            
        }
        
        setLoading(false);
        setShowAdd(true);
    }

    return <>
        <div className={styles["search-item"]}>
            <div className={styles["search-item-info"]}>
                <div className={styles["search-item-img"]}>
                    <img className={styles["img"]} src={s.posterUrl} alt="playlist" />
                </div>
                <div className={styles["search-item-content"]}>
                    <h4>{s.name}</h4>
                    <div className={styles["search-item-data"]}>
                        <span><FontAwesomeIcon icon={faChartSimple} /> {s.audios.length}</span>
                    </div>
                </div>
            </div>
            <div className={styles["search-item-action"]}>
                {s.audios.findIndex(x => x.id === audioId) > -1
                    ? <button type="button" onClick={() => { onRemoveClick(s.id, audioId) }}>{loading ? "Loading..." : "Remove"}</button>
                    : <button type="button" onClick={() => { onAddClick(s.id, audioId) }}>{loading ? "Loading..." : "Add"}</button>
                }
            </div>
        </div>
    </>
};

export default PlaylistSearchListItem;


