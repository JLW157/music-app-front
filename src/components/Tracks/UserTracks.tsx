import axios from "axios";
import { useEffect, useState } from "react";
import { getUserAudiosUrl } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";
import TrackList from "./TrackList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchUserSongs } from "../../store/features/playerSlice";

const UserTracks = () => {
    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.player);
    
    useEffect(() => {
        dispatch(fetchUserSongs());
    }, [dispatch]);

    return <>
        <TrackList songs={player.songs}></TrackList>
    </>
};

export default UserTracks;