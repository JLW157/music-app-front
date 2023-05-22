// store/slice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { audiosUrl, getUserAudiosUrl, getUserAudisByUsernameUrl } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";

interface ITrack {
    song: ISong;
    isPlaying: boolean;
}

interface AppState {
    tracks: ITrack[];
    currentTrack: ITrack | undefined;
}

const initialState: AppState = {
    tracks: [],
    currentTrack: {
        song: null!,
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

export const fetchUserSongsByUsername = createAsyncThunk<ISong[], string | undefined, { rejectValue: string }>(
    "player/fetchUserSongsByUsername",
    async (username, thunkAPI) => {
        try {
            const response = await axios.get(`${getUserAudisByUsernameUrl}?username=${username}`);
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
                state.currentTrack = state.tracks.find((track) => track.song?.id === action.payload) || undefined;
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
            if (currentIndex > -1 && currentIndex < state.tracks.length - 1) {
                state.currentTrack = state.tracks[currentIndex + 1];
            }
        },
        playPrevTrack: (state) => {
            const currentIndex = state.tracks.findIndex(x => x.song?.id === state.currentTrack?.song?.id)
            if (currentIndex > -1 && currentIndex > 0) {
                state.currentTrack = state.tracks[currentIndex - 1];
            }
        },
        setNewCountForTrack: (state, currentTrackIdPayload: PayloadAction<{idTrack?: string , newCount: number}>) => {
            const currentIndex = state.tracks.findIndex(x => x.song?.id === currentTrackIdPayload.payload.idTrack);
            
            if (currentIndex > -1 && currentIndex >= 0) {
                state.tracks[currentIndex].song!.playedCount = currentTrackIdPayload.payload.newCount;
            }
        }
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
            }))];
        }).addCase(fetchUserSongsByUsername.fulfilled, (state, action) => {
            state.tracks = [...action.payload.map((song) => ({
                song,
                isPlaying: false,
            }))];
        });
    },
});

export const { setCurrentTrack, setNewCountForTrack, playCurrentTrack, pauseTrack, playNextTrack, playPrevTrack } = appSlice.actions;

export default appSlice.reducer;
