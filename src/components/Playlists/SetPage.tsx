import { useEffect, useState } from "react";
import styles from "./SetPage.module.css";
import { ISetDTO } from "../../models/set.models";
import TrackList from "../Tracks/TrackList";
import Loader from "../UI/Loader";
import axios from "axios";
import { ISong } from "../../models/track-models";
import { getAudiosSetsUrl } from "../../utils/endpoints";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { ITrack, setTracks } from "../../store/features/appSlice";
const SetPage = () => {
    const dispatch = useAppDispatch();

    const { nameOfSet } = useParams();
    const [set, setSet] = useState<ISetDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);

        axios.get<ISetDTO>(`${getAudiosSetsUrl}?nameOfSet=${nameOfSet}`)
            .then(res => {
                setSet(res.data);

                var tracks: ITrack[] = res.data.audios.map(x => {
                    var track: ITrack = {
                        isPlaying: false,
                        song: x
                    };
                    return track;
                })!;

                dispatch(setTracks(tracks))
            },
                rej => {

                });

        setLoading(false);
    }, []);

    return <>
        <div className={styles["set-page-wrapper"]}>
            {loading ? <>
                <Loader height={300} width={300} />
            </> :
                <>
                    {set ? <>
                        {set.audios.length > 0 ? <>
                            <h2>{set.name}</h2>
                            <br/>
                            <TrackList songs={set.audios} />
                        </> : <>
                            <h2>{set.name}</h2>
                            <br/>
                            <h4>Playlist is empty</h4>
                        </>
                        }
                    </>
                        : <>
                            <h3>Not found</h3>
                        </>}
                </>}
        </div>
    </>
};

export default SetPage;