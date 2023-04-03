import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import audiosSlice from "./features/audiosSlice";
import playerSlice from "./features/playerSlice";
import popularSlice from "./features/popularSlice";
import authSlice from "./features/authSlice";

const store = configureStore({
    reducer: {
        audio: audiosSlice,
        popularSongs: popularSlice,
        player: playerSlice,
        auth: authSlice,
    }
});

export default store;

// hooks to comfy work with redux
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;