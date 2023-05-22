import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { audiosUrl, getUserAudiosUrl, getUserProfileInfo } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";

interface IProfileInfo {
    username: string | undefined;
    email: string | undefined;
    tracks: ISong[];
}

export interface IProfileState {
    profileInfo: IProfileInfo;
    error: string | undefined;
    loading: boolean;
}

const initialState: IProfileState = {
    profileInfo: {
        username: '',
        email: '',
        tracks: []
    },
    error: "",
    loading: false,
};

export const getUserInfoAsync = createAsyncThunk<IProfileInfo, string | undefined, { rejectValue: string }>(
"profile/getUserInfo",
    async (username, thunkAPI) => {
        try {
            console.log("IN FETCH POPULAR SONS");
            const resposne = await axios.get(`${getUserProfileInfo}?username=${username}`);

            console.log("Resposne from popular songs", resposne.data);

            return resposne.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error occured while loading");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    },
    extraReducers: (buidler) => {
        buidler.addCase(getUserInfoAsync.fulfilled, (state, action) => {
            state.profileInfo = action.payload;
            state.error = undefined;
            state.loading = false;
        }).addCase(getUserInfoAsync.pending, (state, action) => {
            state.loading = true;
        }).addCase(getUserInfoAsync.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export const {

} = profileSlice.actions;

export default profileSlice.reducer;
