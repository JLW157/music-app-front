import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useEffect, useState } from "react";
import { getUserInfoAsync } from "../../../store/features/profileSlice";

const UserProfile = () => {
    const profile = useAppSelector(state => state.usersProfile);
    const dispatch = useAppDispatch();
    const [isFound, setIsFound] = useState<boolean>(false);
    const { username } = useParams();


    useEffect(() => {
        dispatch(getUserInfoAsync(username)).unwrap().then(
            res => {
                setIsFound(true);
            },
            rej => {
                setIsFound(false);
            }
        );
    }, [dispatch, username])

    return <>
        {profile.loading ? <>
            <h2>Loading...</h2>
        </> : <>
            {isFound
                ? <>
                    <div className="profle-page">
                        <div className="profile-page-header">
                            <div className="profile-page-header-info">
                                <div className="profileHeaderInfo__content sc-media-content">
                                    <h2>
                                        {profile.profileInfo.username}
                                    </h2>
                                    <br />
                                    <h3>{profile.profileInfo.email}</h3>
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
                :
                <>
                    <h2>User not found</h2>
                </>}
        </>
        }
    </>
};

export default UserProfile;