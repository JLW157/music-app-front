import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const ProfileLayout = () => {
    return <>
        <Profile></Profile>
        <Outlet />
    </>
};

export default ProfileLayout;