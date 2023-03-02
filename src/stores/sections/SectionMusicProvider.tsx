import { useState, ReactNode } from "react";
import { song } from "../../data";
import SectionMusicContext, { sectionMusicContextProps } from "./sectionMusicContext";

const SectionMusicProvider = (props: playerProviderProps) => {
    const [songs, setSongs] = useState<song[]>([]);
    const [songIndex, setSongIndex] = useState<number>(0);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);

    const playMusic = (audio: HTMLAudioElement) => {
        audio.play();
    }

    const playerContext: sectionMusicContextProps = {
        songs,
        songIndex,
        showPlayer,
        setSongIndex,
        setSongs,
        setShowPlayer,
        playMusic
    };

    return <>
        <SectionMusicContext.Provider value={playerContext }>
            {props.children}
        </SectionMusicContext.Provider>
    </>
};

interface playerProviderProps{
    children: ReactNode;
}

export default SectionMusicProvider;