import { ISetDTO } from "../../../models/set.models";
import SetListItem from "../SetListItem/SetListItem";
import styles from "./SetsList.module.css";
interface ISetsListProps {
    songs: ISetDTO[];
}

const SetsList = ({ songs}: ISetsListProps) => {
    return <>
        <ul className={styles["track-list"]}>
            {songs.length < 1 ? <h1>No songs</h1> : songs.map((s, index) => <li className="track-list-item">
                <SetListItem key={index} s={s} />
            </li>)}
        </ul>
    </>
};

export default SetsList;