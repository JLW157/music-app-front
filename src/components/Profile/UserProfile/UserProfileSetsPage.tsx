import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITrack, fetchUserSongsByUsername, setTracks } from "../../../store/features/appSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import axios from "axios";
import { ISetDTO } from "../../../models/set.models";
import { getAudiosSetsUrl, getSetsForProfileUser } from "../../../utils/endpoints";
import SetsList from "../../Playlists/SetsList/SetsList";
import Loader from "../../UI/Loader";

const UserProfileSetsPage = () => {
    const dispatch = useAppDispatch();

    const { nameOfSet } = useParams();
    const [sets, setSets] = useState<ISetDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        axios.get<ISetDTO[]>(`${getSetsForProfileUser}`)
            .then(res => {
                setSets(res.data);
            },
                rej => {

                });

        setLoading(false);
    }, []);

    return <>
        {loading ? <>
            <Loader height={100} width={100}></Loader>
        </>
            :
            <>
                <SetsList sets={sets}></SetsList>
            </>}
    </>
};

export default UserProfileSetsPage;