import { style } from "wavesurfer.js/src/util";
import { ISetDTO } from "../../models/set.models";
import styles from "./PlaylistSearchList.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PlaylistSearchListItem from "./PlaylistSearchListItem";
interface IPlaylistSearchList {
    sets: Array<ISetDTO>;
    audioId: string;
}

const PlaylistSearchList = ({ sets, audioId }: IPlaylistSearchList) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return <>
        <ul className={styles["playlist-search-list"]}>
            {sets.map(s => {
                return <li className={styles["playlist-search-item"]}>
                    <PlaylistSearchListItem s={s} audioId={audioId} />
                </li>
            })}
        </ul>
    </>
};

export default PlaylistSearchList;