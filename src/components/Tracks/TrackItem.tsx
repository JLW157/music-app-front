import { useState, useRef } from "react";
import { ISong } from "../../models/track-models";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setShowPlayer, pauseMusic, playMusic } from "../../store/features/playerSlice";

interface ITrackItemProps {
    s: ISong;
}

const TrackItem = ({ s }: ITrackItemProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const isPlayingRef = useRef<boolean>(false);
    const player = useAppSelector(s => s.player);
    const dispatch = useAppDispatch();

    function toggleAudio() {
        if (!player.showPlayer) {
            dispatch(setShowPlayer(true));
        }
        if (player.isPlaying) {
            dispatch(pauseMusic());
        }
        else {
            dispatch(playMusic(s));
        }
    }



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
                        <div className="sound-item-playbutton" onClick={toggleAudio}>
                            <div className="circle-button">
                                <div className="triangle-button"></div>
                            </div>
                        </div>
                    </div>
                    <div className="sound-item-number">
                        <span>{100}</span>
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
            <audio ref={audioRef} src={s.audioUrl} autoPlay={false} />
        </>
    );
};

export default TrackItem;
