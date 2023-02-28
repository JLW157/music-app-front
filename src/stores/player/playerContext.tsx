import React from "react";
import { song } from "../../data";

const defaultValues: playerContextProps = {
}

export const PlayerContext = React.createContext<playerContextProps>(defaultValues);

export interface playerContextProps{
}