import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import MusicPlayer from "../Main/MusicPlayer/MusicPlayer";
import MainNavigation from "../Main/Navigation/MainNavigation";
import Sidebar from "../Sidebar/Sidebar";
import "./RootLayout.css"

const RootLayout = () => {
    const showPlayer = useAppSelector(state => state.player.showPlayer);
    
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