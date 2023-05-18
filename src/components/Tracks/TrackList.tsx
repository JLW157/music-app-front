import { useState } from "react";
import "./TrackList.css";
import TrackItem from "./TrackItem";
import { ISong } from "../../models/track-models";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setTrack, pauseTrack } from "../../store/features/appSlice";
import { setShowPlayer } from "../../store/features/playerSlice";

interface ITrackListProps{
    songs: ISong[];
}

const TrackList = ({songs}: ITrackListProps) => { 
    const {player, app} = useAppSelector(s => s);
    const dispatch = useAppDispatch();

    // const handlePlayTrack = (trackId: string| undefined) => {
    //     console.log("Handling playing track, ", trackId, !app.currentTrack?.isPlaying);
    //     if (!player.showPlayer) {
    //         dispatch(setShowPlayer(true));
    //     }

    //     if (!app.currentTrack?.isPlaying) {
    //         dispatch(playTrack(trackId));
    //     }
    //     else if(app.currentTrack.isPlaying && !(app.currentTrack?.song?.id !== s?.id)){
    //         dispatch(playTrack(trackId));
    //     }
    //     else{
    //         dispatch(pauseTrack());
    //     }
    // };

    return <>
        <div className="track-list-wrapper">
            <div className="track-list-title">
                <h3>Your tracks</h3>
            </div>
            <ul className="track-list">
                {songs.length < 1 
                ? 
                <h1>No songs</h1> 
                : 
                songs.map((s, index) => <li key={s.id} className="track-list-item">
                    <TrackItem s={s}/>
                </li>)}
            </ul>
        </div>
    </>
};

export default TrackList;