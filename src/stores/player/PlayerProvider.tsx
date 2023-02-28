import { useState, useRef, ReactNode } from "react";
import { song, songs } from "../../data";
import { PlayerContext, playerContextProps } from "./playerContext";

const PlayerProvider = (props: playerProviderProps) => {

    const playerContext: playerContextProps = {
    };

    return <>
        <PlayerContext.Provider value={playerContext }>
            {props.children}
        </PlayerContext.Provider>
    </>
};

interface playerProviderProps{
    children: ReactNode;
}

export default PlayerProvider;