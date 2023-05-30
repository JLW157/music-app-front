import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import MusicPlayer from "../Main/MusicPlayer/MusicPlayer";
import MainNavigation from "../Main/Navigation/MainNavigation";
import Sidebar from "../Sidebar/Sidebar";
import "./RootLayout.css"
import { setNewCountForTrack } from "../../store/features/appSlice";

const RootLayout = () => {
    const showPlayer = useAppSelector(state => state.player.showPlayer);
    const { connection, isConnected } = useAppSelector(state => state.signalR);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (connection) {
            connection.on("IncrementTrackCount", (audioCount: number, audioId: string) => {
                console.log("Setting the new count ", audioCount, audioId);
                dispatch(setNewCountForTrack({ idTrack: audioId, newCount: audioCount }));
            });
        }
        else {
            console.log("Event not registered");
        }

    }, [connection, dispatch])

    return <>
        <div className="grid-container">
            <Sidebar />
            <div className={"main-container"}>
                <MainNavigation />
                <Outlet />
            </div>
            {showPlayer === true && <MusicPlayer />}
        </div>
    </>
};

export default RootLayout;