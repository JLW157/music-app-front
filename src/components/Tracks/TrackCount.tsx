import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { trackCountSignalRUrl } from "../../utils/endpoints";
import { useAppDispatch } from "../../store/store";
import { setNewCountForTrack } from "../../store/features/appSlice";
import { ISong } from "../../models/track-models";

interface ITrackCountProps {
    className?: string;
    track: ISong;    
}

const TrackCount = ({ track, className }: ITrackCountProps) => {
    const dispatch = useAppDispatch();
    console.log("Track count - ", track.playedCount);
    return <>
        <span className={className ?? ""}>{track.playedCount}</span>
    </>
};

export default TrackCount;