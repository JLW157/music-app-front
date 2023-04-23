import { faL } from "@fortawesome/free-solid-svg-icons";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ISong } from "../../data";
import { audiosUrl } from "../../utils/endpoints";

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
    "audios/fetchAudios",
    async (text, thunkAPI) => {
        try {
            const response = await axios.get(audiosUrl);
            
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
)


const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        playMusic: (state, action: PayloadAction<ISong>) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
        },
        pauseMusic: (state) => {
            state.isPlaying = false;
        },
        setSongs: (state, action: PayloadAction<ISong[]>) => {
            state.songs = action.payload;
        },
        setShowPlayer: (state, action: PayloadAction<boolean>) => {
            state.showPlayer = action.payload;
        },
        nextTrack: (state) => {
            const currentIndex = state.songs.findIndex(x => x.id === state.currentSong?.id);
            console.log("After ended");
            if(currentIndex < state.songs.length - 1){
                state.currentSong = state.songs[currentIndex + 1];
                state.isPlaying = true;
            }   
        },
        prevTrack: (state) => {
            const currentIndex = state.songs.findIndex(track => track.id === state.currentSong?.id);
            if (currentIndex > 0) {
                state.currentSong = state.songs[currentIndex - 1];
                state.isPlaying = true;
            }
        }  
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.songs = action.payload;
        })
    }
});

export const { playMusic, setShowPlayer, setSongs, prevTrack, nextTrack, pauseMusic } = playerSlice.actions

export default playerSlice.reducer;



