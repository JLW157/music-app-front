import React from "react";
import { song } from "../../data";

const defaultValues: sectionMusicContextProps = {
    songs: [],
    setSongs: ()=> {},
    setSongIndex: ()=> {},
    songIndex: 0,
    showPlayer: false,
    setShowPlayer: () => {}
}

const SectionMusicContext = React.createContext<sectionMusicContextProps>(defaultValues);

export default SectionMusicContext;

export interface sectionMusicContextProps {
    songs: song[];
    songIndex: number,
    showPlayer: boolean,
    setShowPlayer: (value: boolean) => void;
    setSongs: (songs: song[]) => void;
    setSongIndex: (index: number)=> void,
}