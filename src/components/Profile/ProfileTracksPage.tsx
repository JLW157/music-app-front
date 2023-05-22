import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import UserTracks from "../Tracks/UserTracks";
import { fetchUserSongs, fetchUserSongsByUsername } from "../../store/features/appSlice";
import { useParams } from "react-router-dom";

const ProfileTracksPage = () => {
    const dispatch = useAppDispatch();
    const { tracks } = useAppSelector(state => state.app);

    useEffect(() => {
        dispatch(fetchUserSongs());
    }, [dispatch]);
    return <>
        <UserTracks songs={tracks.map(x => x.song!)} />
    </>
};

export default ProfileTracksPage;