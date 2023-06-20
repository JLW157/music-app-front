import { ISetDTO } from "../../../models/set.models";
import SetListItem from "../SetListItem/SetListItem";
import styles from "./SetsList.module.css";
interface ISetsListProps {
    sets: ISetDTO[];
}

const SetsList = ({ sets: sets}: ISetsListProps) => {
    return <>
        <ul className={styles["track-list"]}>
            {sets.length < 1 ? <h1>No songs</h1> : sets.map((s, index) => <li className="track-list-item">
                <SetListItem key={index} s={s} />
            </li>)}
        </ul>
    </>
};

export default SetsList;