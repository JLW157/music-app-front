// store/slice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../data";
import axios from "axios";
import { audiosUrl, getUserAudiosUrl } from "../../utils/endpoints";

interface ITrack {
    song: ISong | null;
    isPlaying: boolean;
}

interface AppState {
    tracks: ITrack[];
    currentTrack: ITrack | null;
}

const initialState: AppState = {
    tracks: [],
    currentTrack: {
        song: null,
        isPlaying: false
    },
};

export const fetchSongs = createAsyncThunk<ISong[]>(
    "app/fetchSongs",
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


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<string | undefined>) => {
            if (state.currentTrack?.song?.id !== action.payload) {
                state.currentTrack = state.tracks.find((track) => track.song?.id === action.payload) || null;
            }
        },
        playCurrentTrack: (state) => {
            state.currentTrack!.isPlaying = true;
        },
        pauseTrack: (state) => {
            state.currentTrack!.isPlaying = false;
        },
        playNextTrack: (state) => {
            const currentIndex = state.tracks.findIndex(x => x.song?.id === state.currentTrack?.song?.id)
            if (currentIndex > -1 && currentIndex < state.tracks.length) {
                state.currentTrack = state.tracks[currentIndex + 1];
                state.currentTrack.isPlaying = true;
            }
        },
        playPrevTrack: (state) => {
            const currentIndex = state.tracks.findIndex(x => x.song?.id === state.currentTrack?.song?.id)
            if (currentIndex > -1 && currentIndex > 0) {
                state.currentTrack = state.tracks[currentIndex - 1];
                state.currentTrack.isPlaying = true;
            }
        },
    }, extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.tracks = [...action.payload.map((song) => ({
                song,
                isPlaying: false,
            }))];

        }).addCase(fetchUserSongs.fulfilled, (state, action) => {
            console.log("REsposne from user tracks ", action.payload);
            state.tracks = [...action.payload.map((song) => ({
                song,
                isPlaying: false,
            }))];;
        });
    },
});

export const { setCurrentTrack: setTrack, playCurrentTrack, pauseTrack, playNextTrack, playPrevTrack } = appSlice.actions;

export default appSlice.reducer;
