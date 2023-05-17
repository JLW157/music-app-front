import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { audiosUrl, getUserAudiosUrl } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";

export interface IPlayerState {
    isPlaying: boolean;
    currentSong: ISong | undefined;
    songs: ISong[];
    showPlayer: boolean;
}

const initialState: IPlayerState = {
    isPlaying: false,
    currentSong: undefined,
    songs: [],
    showPlayer: false,
};

export const fetchSongs = createAsyncThunk<ISong[]>(
    "player/fetchSongs",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(audiosUrl);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
);

export const fetchUserSongs = createAsyncThunk<ISong[]>(
    "player/fetchUserSongs",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(getUserAudiosUrl);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
)

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        playMusic: (state, action: PayloadAction<ISong>) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
        },
        pauseMusic: (state) => {
            state.isPlaying = false;
        },
        setShowPlayer: (state, action: PayloadAction<boolean>) => {
            state.showPlayer = action.payload;
        },
        nextTrack: (state) => {
            const currentIndex = state.songs.findIndex(
                (song) => song.id === state.currentSong?.id
            );
            if (currentIndex < state.songs.length - 1) {
                state.currentSong = state.songs[currentIndex + 1];
                state.isPlaying = true;
            }
        },
        prevTrack: (state) => {
            const currentIndex = state.songs.findIndex(
                (song) => song.id === state.currentSong?.id
            );
            if (currentIndex > 0) {
                state.currentSong = state.songs[currentIndex - 1];
                state.isPlaying = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
        }).addCase(fetchUserSongs.fulfilled, (state, action) => {
            console.log("REsposne from user tracks ", action.payload);
            state.songs = action.payload;
        });
    },
});

export const {
    playMusic,
    pauseMusic,
    setShowPlayer,
    nextTrack,
    prevTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
