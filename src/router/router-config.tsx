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
import Authorized from "../components/Hocs/Authorized";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Navigate to='home' />} />
            <Route path="home" element={<MainContent />}></Route>
            <Route path='search' element={<>
                <Authorized authorized={<Search/>}/>
            </>} />
            <Route path='playlists' element={<PlaylistLayout />}>
                <Route index element={<Playlists />} />
                <Route path='create' element={<CreatePlaylist />} />
            </Route>
            <Route path="liked" element={<Liked />} />
            <Route path="section/:id" element={<SectionPage />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Route >
    ));

const MyRouter = () => {
    return <RouterProvider router={router}></RouterProvider>
};

export default MyRouter;