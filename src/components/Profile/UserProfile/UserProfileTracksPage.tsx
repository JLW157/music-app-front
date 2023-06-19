import { useEffect } from "react";
import { fetchUserSongs, fetchUserSongsByUsername } from "../../../store/features/appSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useParams } from "react-router-dom";
import UserTracks from "../../Tracks/UserTracks";

const UserProfileTracksPage = () => {
    const dispatch = useAppDispatch();

    const { username } = useParams();

    const { tracks } = useAppSelector(state => state.app);

    useEffect(() => {
        dispatch(fetchUserSongsByUsername(username));
    }, [dispatch]);

    return <>
        <UserTracks songs={tracks.map(x => x.song!)}/>
    </>
};

export default UserProfileTracksPage;