import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthenticatedUserResponse, IGoogleRequest, ILoginRequest, IRegisterRequest, IRole } from "../../models/auth.models";
import axios from "axios";
import { confirmEmailUrl, googleUrl, loginUrl, registerUrl } from "../../utils/endpoints";
import authService from "../../services/auth-service";

export interface IUserInfo {
    roles: IRole[],
    email: string;
    username: string;
}

export interface IAuthSliceState {
    isLoggedIn: boolean;
    loading: boolean;
    user: IAuthenticatedUserResponse | null,
    userInfo: IUserInfo | null;
};

export interface IModelErrors {
    name: string;
    errors: string[];
};

const user = JSON.parse(localStorage.getItem("user")!) as IAuthenticatedUserResponse;

const initialState: IAuthSliceState = user ? {
    isLoggedIn: true,
    user: user,
    loading: false,
    userInfo: null,
} : { isLoggedIn: false, user: null, loading: false, userInfo: null };


export const confirmEmailAsync = createAsyncThunk<string, { token: string, email: string }, { rejectValue: string }>(
    "auth/confirmEmailAsync",
    async (creds, thunkAPI) => {
        try {
            const response = await axios.get(`${confirmEmailUrl}?token=${creds.token}&email=${creds.email}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginAsync = createAsyncThunk<IAuthenticatedUserResponse, ILoginRequest, { rejectValue: string[] }>(
    "auth/loginAsync",
    async (login, thunkAPI) => {
        try {
            const response = await axios.post(loginUrl, login);

            return response.data;
        } catch (error: any) {
            console.log(error.response);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const registerAsync = createAsyncThunk<string, IRegisterRequest, { rejectValue: string[] }>(
    "auth/registerAsync",
    async (register, thunkAPI) => {
        try {
            const response = await axios.post(registerUrl, register);

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const google = createAsyncThunk<IAuthenticatedUserResponse, IGoogleRequest, { rejectValue: string[] }>(
    "auth/google",
    async (googleRequest, thunkAPI) => {
        try {
            const resposne = await axios.post(googleUrl, googleRequest);

            return resposne.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
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
            state.userInfo = null;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        handleAuth: (state) => {
            console.log("Handling token");
            // check tokens exists local storage
            const token = authService.getToken()
            const expiration = authService.getExpirtion();
            if (token && expiration) {

                // handle expiration
                const expired = authService.handleExpiration(token, expiration);

                // token expired
                if (expired) {
                    authService.logout();
                    state.isLoggedIn = false;
                    state.user = null;
                    state.userInfo = null;
                    return;
                }

                const response = authService.getInfoFromJwt(token);

                if (!state.isLoggedIn) {
                    state.isLoggedIn = true;
                }
                state.userInfo = response;
                console.log("Handling auth", state.isLoggedIn, state.userInfo);
            }
            else {
                if (state.isLoggedIn) {
                    // logout user is there is no token
                    authService.logout();
                    state.isLoggedIn = false;
                    state.user = null;
                    state.userInfo = null;
                    return;
                }
            }


        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state, action) => {
            state.loading = true;
        }).addCase(loginAsync.fulfilled, (state, action) => {
            console.log("Success login! ", action.payload);
            if (action.payload.token) {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                authService.setToken(action.payload);
                state.userInfo = authService.getInfoFromJwt(action.payload.token);
            }
        }).addCase(loginAsync.rejected, (state, action) => {
            console.log("REJECTED");
            if (action?.payload) {
            }

            state.loading = false;
        }).addCase(registerAsync.pending, (state, action) => {
            state.loading = true;
        }).addCase(registerAsync.fulfilled, (state, action) => {
            state.loading = false;

        }).addCase(registerAsync.rejected, (state, action) => {
            if (action?.payload) {
            }
            state.loading = false;
        })
            .addCase(google.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(google.fulfilled, (state, action) => {
                if (action.payload.token) {
                    state.loading = false;
                    state.isLoggedIn = true;
                    state.user = action.payload;
                    authService.setToken(action.payload);
                    state.userInfo = authService.getInfoFromJwt(action.payload.token);
                }
            })
            .addCase(google.rejected, (state, action) => {
                if (action?.payload) {
                }
                state.loading = false;
            })
            .addCase(confirmEmailAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(confirmEmailAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(confirmEmailAsync.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export const { logout, setIsLoggedIn, handleAuth } = authSlice.actions;

export default authSlice.reducer;