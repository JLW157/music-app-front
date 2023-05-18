import { useState, useRef, useEffect } from "react";
import { ISong } from "../../models/track-models";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setShowPlayer, pauseMusic, playMusic } from "../../store/features/playerSlice";
import { pauseTrack, playCurrentTrack, setTrack } from "../../store/features/appSlice";

interface ITrackItemProps {
    s: ISong;
}

const TrackItem = ({ s }: ITrackItemProps) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const { player, app } = useAppSelector(s => s);
    const dispatch = useAppDispatch();

    const handlePlayTrack = (trackId: string | undefined) => {
        console.log(`Handling playing track, TrackId: ${trackId} |  app current id: ${app.currentTrack?.song?.id} | IsPlaying: ${app.currentTrack?.isPlaying}`);
        if (!player.showPlayer) {
            dispatch(setShowPlayer(true));
        }

        if (app.currentTrack?.isPlaying === false) {
            console.log("In isPlaying false");
            if (app.currentTrack?.song?.id === s.id) {
                dispatch(playCurrentTrack());
            } else {
                dispatch(setTrack(trackId));
            }
        }
        else {
            console.log("In isPlaying true");
            dispatch(pauseTrack());
        }
    };



    return (
        <>
            <div className="sound">
                <div className="sound-item-row">
                    <div
                        className={`sound-item-img-wrapper ${hovered ? "hovered" : ""}`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <div className="sound-item-img">
                            <img src={s.posterUrl} height="30" width="30" alt="" />
                        </div>
                        <div className="sound-item-playbutton" onClick={() => handlePlayTrack(s.id)}>
                            <div className="circle-button">
                                <div className="triangle-button"></div>
                            </div>
                        </div>
                    </div>
                    <div className="sound-item-number">
                        <span>{s.id}</span>
                    </div>
                    <div className="sound-item-content">
                        <a href="#!">{s.artists[0]}</a>
                        <span>-</span>
                        <a href="#!">{s.name}</a>
                    </div>
                    <div className="sound-item-additional">
                        <span className="sound-item-playcount">0K</span>
                    </div>
                </div>
            </div>
            {/* <audio ref={audioRef} src={s.audioUrl} autoPlay={false} /> */}
        </>
    );
};

export default TrackItem;
