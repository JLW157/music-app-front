import { Link, NavLink, Outlet } from "react-router-dom";
import TrackList from "../Tracks/TrackList";
import "./Profile.css";
import { useAppSelector } from "../../store/store";

const Profile = () => {
    const user = useAppSelector(state => state.auth.userInfo);
    
    return <>
        <div className="profle-page">
            <div className="profile-page-header">
                <div className="profile-page-header-info">
                    <div className="profileHeaderInfo__content sc-media-content">
                        <h2 className="profileHeaderInfo__userName g-type-shrinkwrap-block g-type-shrinkwrap-large-primary sc-text-h1 theme-dark">
                            {user?.username}
                        </h2>
                        <br />
                        <h3 className="profileHeaderInfo__additional g-type-shrinkwrap-block theme-dark g-type-shrinkwrap-large-secondary">{user?.email}</h3>
                    </div>
                </div>
            </div>
            <div className="profile-page-tabs">
                <ul className="profile-page-tabs-list">
                    <li className="tabs-item">
                        <NavLink to={"tracks"} className={({ isActive, isPending }) =>
                            isActive ? "tabs-link active" : "tabs-link"
                        }>
                            Tracks
                        </NavLink>
                    </li>
                    <li className="tabs-item">
                        <NavLink to={"sets"} className="tabs-link" >
                            Playlists
                        </NavLink>
                    </li>
                    <li className="tabs-item">
                        <NavLink to={"liked"} className="tabs-link">
                            Liked tracks
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="profile-page-main">
                <Outlet />
            </div>
        </div>
    </>
};

export default Profile;