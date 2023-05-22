import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from "react-router-dom";
import Liked from "../components/Liked/Liked";
import MainContent from "../components/Main/MainContent";
import CreatePlaylist from "../components/Playlists/CreatePlaylist";
import Playlists from "../components/Playlists/Playlists";
import Search from "../components/Search/Search";
import SectionPage from "../components/SectionPage/SectionPage";
import PlaylistLayout from "../components/UI/PlaylistsLayout";
import RootLayout from "../components/UI/RootLayout";
import Login from "../components/Auth/Login";
import NotFoundPage from "../components/UI/NotFoundPage";
import Register from "../components/Auth/Register";
import EmailSent from "../components/Email/EmailSent";
import UploadTrackPage from "../components/Tracks/UploadTrack";
import TracksLayout from "../components/Tracks/TracksLayout";
import Authorized from "../components/Hocs/Authorized";
import Profile from "../components/Profile/Profile";
import UserProfile from "../components/Profile/UserProfile/UserProfile";
import UserProfileTracksPage from "../components/Profile/UserProfile/UserProfileTracksPage";
import ProfileTracksPage from "../components/Profile/ProfileTracksPage";
import TrackView from "../components/Tracks/TrackView/TrackView";
import TrackViewPage from "../components/Tracks/TrackView/TrackViewPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Navigate to='home' />} />
            <Route path="home" element={<MainContent />} />
            <Route path="emailsent/:email" element={<EmailSent />} />
            <Route path='search' element={<Search />} />
            <Route path='playlists' element={<PlaylistLayout />}>
                <Route index element={<Playlists />} />
                <Route path='create' element={<CreatePlaylist />} />
            </Route>
            <Route path="tracks" element={<TracksLayout />}>
                <Route index element={<Navigate to={"/"} />}></Route>
                <Route path="upload" element={<Authorized authorized={<UploadTrackPage />} nonAuthorized={<Navigate to={"/login"} />}></Authorized>} />
            </Route>

            <Route path="liked" element={<Liked />} />
            <Route path="section/:id" element={<SectionPage />}></Route>
            <Route path="login/:email?" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>

            <Route path="me" element={<Profile />}>
                <Route index element={<Navigate to={"tracks"} />} />
                <Route path="tracks" element={<ProfileTracksPage />} />
                <Route path="sets" element={<h2>My Sets</h2>} />
            </Route>

            <Route path=":username/:trackName" element={<TrackViewPage />} />
            <Route path=":username" element={<UserProfile />} >
                <Route path="tracks" element={<UserProfileTracksPage />} />
                {/* <Route path="sets" element={<UserSets />} />
                <Route path="sets/:nameOfSet" element={<SetDetail />} />
                <Route path="tracks/:nameofTrack" element={<TrackDetail />} /> */}
            </Route>

            <Route path="*" element={<NotFoundPage />}></Route>
        </Route >
    ));

const MyRouter = () => {
    return <RouterProvider router={router}></RouterProvider>
};

export default MyRouter;