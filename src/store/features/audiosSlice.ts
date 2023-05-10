import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ISong } from "../../data";
import { audiosUploadUrl, audiosUrl } from "../../utils/endpoints";
import { IUploadTrackDTO } from "../../models/track-models";

export interface IAudiosState {
    audios: ISong[];
};


const initialState: IAudiosState = {
    audios: [],
};

export const fetchAudios = createAsyncThunk<ISong[], { rejectValue: string }>(
    "audios/fetchAudios",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(audiosUrl);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
);

export const uploadTrack = createAsyncThunk<string, IUploadTrackDTO, { rejectValue: string }>(
    "audios/uploadTrack",
    async (data, thunkAPI) => {
        try {
            const resposne = await axios.post(audiosUploadUrl, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log("Uploaded", resposne);

            return resposne.data;
        } catch (error: any | AxiosError) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                return thunkAPI.rejectWithValue(error.response?.data);
            }
            return thunkAPI.rejectWithValue("Something went wrong");
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