import { useState } from "react";
import "./TrackList.css";
import TrackItem from "./TrackItem";
import { ISong } from "../../models/track-models";

interface ITrackListProps{
    songs: ISong[];
}

const TrackList = ({songs}: ITrackListProps) => { 

    console.log(songs.length + " songs lenght");
    return <>
        <div className="track-list-wrapper">
            <div className="track-list-title">
                <h3>Your tracks</h3>
            </div>
            <ul className="track-list">
                {songs.length < 1 ? <h1>No songs</h1> : songs.map((s, index) => <li className="track-list-item">
                    <TrackItem key={index} s={s}/>
                </li>)}
            </ul>
        </div>
    </>
};

export default TrackList;