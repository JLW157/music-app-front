import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from "react-router-dom";
import Liked from "../components/Liked/Liked";
import MainContent from "../components/Main/MainContent";
import CreatePlaylist from "../components/Playlists/CreatePlaylist";
import UserPlaylistsPage from "../components/Playlists/UserPlaylistsPage";
import Search from "../components/Search/SearchInput";
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
import SearchPage from "../components/Search/SearchPage";
import SearchPageWrapper from "../components/Search/SearchPageWrapper";
import SetPage from "../components/Playlists/SetPage";
import UserProfileSetsPage from "../components/Profile/UserProfile/UserProfileSetsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Navigate to='home' />} />
            <Route path="home" element={<MainContent />} />
            <Route path="emailsent/:email" element={<EmailSent />} />

            <Route path="search" element={<SearchPageWrapper />}>
                <Route path="all" element={<Search />}></Route>
                <Route path="tracks"></Route>
                <Route path="people"></Route>
            </Route>

            {/* <Route path='search' element={<SearchPage />} /> */}
            <Route path='sets' element={<Authorized authorized={<PlaylistLayout />} />}>
                <Route index element={<UserPlaylistsPage />} />
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

            <Route path="me" element={<Authorized authorized={<Profile />} />}>
                <Route index element={<Navigate to={"tracks"} />} />
                <Route path="tracks" element={<ProfileTracksPage />} />
                <Route path="sets" element={<UserProfileSetsPage />} />
            </Route>

            <Route path=":username/:trackName" element={<TrackViewPage />} />
            <Route path=":username" element={<UserProfile />} >
                <Route index element={<Navigate to={"tracks"} />} />
                <Route path="tracks" element={<UserProfileTracksPage />} />
                <Route path="sets" element={<UserPlaylistsPage />} />
                {/* <Route path="sets" element={<UserSets />} />
                <Route path="sets/:nameOfSet" element={<SetDetail />} />
                <Route path="tracks/:nameofTrack" element={<TrackDetail />} /> */}
            </Route>
            <Route path="sets/:nameOfSet" element={<SetPage />} />
            <Route path="*" element={<NotFoundPage />}></Route>
        </Route >
    ));

const MyRouter = () => {
    return <RouterProvider router={router}></RouterProvider>
};

export default MyRouter;