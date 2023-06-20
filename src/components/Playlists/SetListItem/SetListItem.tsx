import { useState, useRef, useEffect } from "react";
import { ISetDTO } from "../../../models/set.models";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import TrackCount from "../../Tracks/TrackCount";
import TracksInListCount from "../TracksInListCount";
import styles from "../SetsList/SetsList.module.css"

interface ISetListItemProps {
    s: ISetDTO;
}

const SetListItem = ({ s }: ISetListItemProps) => {
    return (
        <>
            <Link to={`/sets/${s.name}`}>
                <div className={styles["sound"]}>
                    <div className={styles["sound-item-row"]}>
                        <div
                            className={styles[`sound-item-img-wrapper`]}
                        >
                            <div className={styles["sound-item-img"]}>
                                <img src={s.posterUrl} height="30" width="30" alt="" />
                            </div>
                        </div>
                        <div className={styles["sound-item-content"]}>
                            <Link to={`/${s.user}`}>{s.user}</Link>
                            <span>-</span>
                            <Link to={`/${s.user}/${s.name}`}>{s.name}</Link>
                        </div>
                        <div className={styles["sound-item-additional"]}>
                            <FontAwesomeIcon icon={faMusic} />
                            <TracksInListCount className={styles["sound-item-playcount"]} set={s} />
                        </div>
                    </div>
                </div>
                {/* <audio ref={audioRef} src={s.audioUrl} autoPlay={false} /> */}
            </Link>
        </>
    );
};

export default SetListItem;
