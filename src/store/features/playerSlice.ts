import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { audiosUrl, getUserAudiosUrl } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";

export interface IPlayerState {
    showPlayer: boolean;
}

const initialState: IPlayerState = {
    showPlayer: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setShowPlayer: (state, action: PayloadAction<boolean>) => {
            state.showPlayer = action.payload;
        },
    }
});

export const {
    setShowPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
