import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ISong } from "../../data";
import { popularAudioUrl } from "../../utils/endpoints";

export interface IPopularState{
    songs: ISong[];
    loading: boolean;
    error: string | undefined;
};

export const fetchPopularSongs = createAsyncThunk<ISong[]>(
    "popular/fetchPopularSongs",
    async (_, thunkAPI) => {
        try {
            console.log("IN FETCH POPULAR SONS");
            const resposne = await axios.get(popularAudioUrl);
            
            console.log("Resposne from popular songs", resposne.data);

            return resposne.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error occured while loading");
        }
    }
);

const initialState: IPopularState = {
    songs: [],
    loading: false,
    error: undefined,
};

const popularSlice = createSlice({
    name: "popularSongs",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularSongs.fulfilled, (state, action) => {
            console.log("Fulfiled");
            state.songs = action.payload;
            state.loading = false;
        })
        .addCase(fetchPopularSongs.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchPopularSongs.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
});

export default popularSlice.reducer;
