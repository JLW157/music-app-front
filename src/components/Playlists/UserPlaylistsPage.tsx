import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ISong } from "../../models/track-models";
import { getAudioByName, getSetsByUsername, getUserSetsUrl } from "../../utils/endpoints";
import { ISetDTO } from "../../models/set.models";
import Loader from "../UI/Loader";
import SetsList from "./SetsList/SetsList";

const UserPlaylistsPage = () => {
    const { username } = useParams();
    const [sets, setSets] = useState<Array<ISetDTO>>([]);
    const [found, setFound] = useState<boolean>();
    const [loading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        setIsLoading(true);
        axios.get<Array<ISetDTO>>(`${getSetsByUsername}?username=${username}`).then(
            res => {
                setSets(res.data);
                setIsLoading(false);

                setFound(true);
            },
            rej => {
                setIsLoading(false);
                console.log("Failed to retrieve sets", rej);
                setFound(false);
            }
        );
    }, []);
    return <>
        {loading ? <>
            <Loader height={40} width={40} />
        </>
            :
            <>
                <SetsList songs={sets}/>
            </>
        }
    </>
};

export default UserPlaylistsPage;