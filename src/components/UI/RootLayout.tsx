import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SectionMusicContext from "../../stores/sections/sectionMusicContext";
import MusicPlayer from "../Main/MusicPlayer/MusicPlayer";
import MainNavigation from "../Main/Navigation/MainNavigation";
import Sidebar from "../Sidebar/Sidebar";
import "./RootLayout.css"

const RootLayout = () => {
    const { showPlayer } = useContext(SectionMusicContext);

    console.log("SHOW PLAYER", showPlayer)
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