import { useEffect, useState } from "react";
import styles from "./SetPage.module.css";
import { ISetDTO } from "../../models/set.models";
import TrackList from "../Tracks/TrackList";
import Loader from "../UI/Loader";
const SetPage = () => {
    const [set, setSet] = useState<ISetDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);

        setLoading(false);
    }, []);

    return <>
        <div className={styles["set-page-wrapper"]}>
            {loading ? <>
                <Loader height={300} width={300} />
            </> :
                <>
                    {set !== null ? <>
                        <h2>{set.name}</h2>
                        <TrackList songs={set.audios} />
                    </> 
                    : <>
                        <h3>Not found</h3>
                    </>}
                </>}
        </div>
    </>
};

export default SetPage;