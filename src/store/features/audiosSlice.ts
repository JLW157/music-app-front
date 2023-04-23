import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ISong } from "../../data";
import { audiosUrl } from "../../utils/endpoints";

export interface IAudiosState{
    audios: ISong[];
};


const initialState: IAudiosState = {
    audios: [],
};

export const fetchAudios = createAsyncThunk<ISong[]>(
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

const audioSlice = createSlice({
    name: "audio",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAudios.fulfilled, (state, action) => {
            state.audios = action.payload;
        })
    }
});

export default audioSlice.reducer;