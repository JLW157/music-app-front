import { useEffect, useState } from "react";
import "./TrackList.css";
import TrackItem from "./TrackItem";
import { ISong } from "../../models/track-models";
import { connect } from "react-redux";
import { disconnect } from "../../store/features/signlaRSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface ITrackListProps {
    songs: ISong[];
}

const TrackList = ({ songs}: ITrackListProps) => {
    return <>
        <ul className="track-list">
            {songs.length < 1 ? <h1>No songs</h1> : songs.map((s, index) => <li className="track-list-item">
                <TrackItem key={index} index={index+1} s={s} />
            </li>)}
        </ul>
    </>
};

export default TrackList;