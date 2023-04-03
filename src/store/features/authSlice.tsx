import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthenticatedUserResponse, IGoogleRequest, ILoginRequest, IRegisterRequest } from "../../models/auth.models";
import axios from "axios";
import { googleUrl, loginUrl, registerUrl } from "../../utils/enpoints";
import authService from "../../services/auth-service";

export interface IAuthSliceState {
    isLoggedIn: boolean;
    loading: boolean;
    user: IAuthenticatedUserResponse | null,
    error: string | undefined;
};

const user = JSON.parse(localStorage.getItem("user")!) as IAuthenticatedUserResponse;

const initialState: IAuthSliceState = user ? {
    isLoggedIn: true,
    user: user,
    error: undefined,
    loading: false
} : { isLoggedIn: false, user: null, error: undefined, loading: false };


export const login = createAsyncThunk<IAuthenticatedUserResponse, ILoginRequest, { rejectValue: string }>(
    "auth/login",
    async (login, thunkAPI) => {
        try {
            const response = await axios.post(loginUrl, login);

            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue("Failed login");
        }
    }
);

export const register = createAsyncThunk<unknown, IRegisterRequest, { rejectValue: string }>(
    "auth/register",
    async (register, thunkAPI) => {
        try {
            await axios.post(registerUrl, register);
        } catch (error) {
            thunkAPI.rejectWithValue("Register failed");
        }
    }
);

export const google = createAsyncThunk<IAuthenticatedUserResponse, IGoogleRequest, { rejectValue: string }>(
    "auth/google",
    async (googleRequest, thunkAPI) => {
        try {
            const resposne = await axios.post(googleUrl, googleRequest);

            return resposne.data;
        } catch (error) {
            thunkAPI.rejectWithValue("Google auth failed!");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.isLoggedIn = false;
            state.user = null;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        }).addCase(login.fulfilled, (state, action) => {
            if (action.payload.token) {
                state.isLoggedIn = true;
                state.error = undefined;
                state.user = action.payload;
                authService.setToken(action.payload);
            }
        }).addCase(login.rejected, (state, action) => {
            state.error = action.payload;
        }).addCase(register.pending, (state, action) => {
            state.loading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
        }).addCase(register.rejected, (state, action) => {
            state.error = action.payload;
        })
            .addCase(google.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(google.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.error = undefined;
                state.loading = false;
                authService.setToken(action.payload);
            })
            .addCase(google.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { logout, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;