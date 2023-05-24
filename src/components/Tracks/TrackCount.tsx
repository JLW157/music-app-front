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
    return <>
        <span className={className ?? ""}>{track.playedCount}</span>
    </>
};

export default TrackCount;