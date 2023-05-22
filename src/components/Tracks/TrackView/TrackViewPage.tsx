import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISong } from "../../../models/track-models";
import axios from "axios";
import { getAudioByName } from "../../../utils/endpoints";
import TrackView from "./TrackView";

const TrackViewPage = () => {
    const { trackName } = useParams();
    const [track, setTrack] = useState<ISong>();
    const [found, setFound] = useState<boolean>();
    const [loading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        axios.get<ISong>(`${getAudioByName}?name=${trackName}`).then(
            res => {
                setTrack(res.data);
                setIsLoading(false);
                setFound(true);
            },
            rej => {
                setIsLoading(false);
                setFound(false);
            }
        );
    }, []);

    return <>
        {loading
            ? <h2>Loading...</h2>
            : <>
                {found ? <TrackView track={track} /> : <h1>Track not found</h1>}
            </>
        }
    </>
};

export default TrackViewPage;