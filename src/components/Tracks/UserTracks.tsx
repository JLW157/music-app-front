import axios from "axios";
import { useEffect, useState } from "react";
import { getUserAudiosUrl, trackCountSignalRUrl } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";
import TrackList from "./TrackList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchUserSongs } from "../../store/features/appSlice";
import "./UserTracks.css";
import { useDispatch } from "react-redux";
import * as signalR from "@microsoft/signalr";

interface IUserTracks {
    songs: ISong[];
}

const UserTracks = ({ songs }: IUserTracks) => {
    return <>
        <div className="track-list-wrapper">
            <TrackList songs={songs} />
        </div>
    </>
};

export default UserTracks;