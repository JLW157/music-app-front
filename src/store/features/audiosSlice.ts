import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ISong } from "../../data";
import { audiosUploadUrl, audiosUrl } from "../../utils/endpoints";
import { IUploadTrackDTO } from "../../models/track-models";

export interface IAudiosState {
    audios: ISong[];
};


const initialState: IAudiosState = {
    audios: [],
};

export const fetchAudios = createAsyncThunk<ISong[], unknown, { rejectValue: string }>(
    "audios/fetchAudios",
    async (text, thunkAPI) => {
        try {
            const response = await axios.get(audiosUrl);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
);

export const uploadTrack = createAsyncThunk<unknown, IUploadTrackDTO, { rejectValue: string }>(
    "audios/uploadTrack",
    async (data, thunkAPI) => {
        try {
            const resposne = await axios.post(audiosUploadUrl, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("Uploaded", resposne);

            return resposne;
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong!");
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