import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./views/Movie/Home/Home.jsx";
import Details from "./views/Movie/Details/Details.jsx";
import LayoutMovie from "./views/Movie/Layout.jsx";
import LayoutGuest from "./views/Guest/LayoutGuest.jsx";
import LayoutAdmin from "./views/Admin/LayoutAdmin.jsx"
import WatchMovie from "./views/Movie/Watch/WatchMovie.jsx";
import Login from "./views/Guest/Login/Login.jsx";
import Register from "./views/Guest/Register/Register.jsx";
import Verification from "./views/Guest/Verification/Verification.jsx";
import NotFound from "./views/NotFound.jsx";
import Dashboard from "./views/Admin/Dashboard/Dashboard.jsx";
import ApiMovie from "./views/Admin/ApiMovie/ApiMovie.jsx";
import NewMovie from "./views/Admin/NewMovie/NewMovie.jsx";
import ListUsers from "./views/Admin/ListUsers/ListUsers.jsx";
import ListMovies from "./views/Admin/ListMovies/ListMovies.jsx";
import EditMovie from "./views/Admin/EditMovie/EditMovie.jsx";
import Episodes from "./views/Admin/Episodes/Episodes.jsx";
import Filter from "./views/Movie/Filter.jsx";
import WatchList from "./views/Movie/WatchList/WatchList.jsx";
import Setting from "./views/Guest/Setting/Setting.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutMovie />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/:slug',
                element: <Details />
            },
            {
                path: '/:slug/:episode',
                element: <WatchMovie />
            },
            {
                path: '/tim-kiem',
                element: <Filter />
            },
            {
                path: '/xem-sau',
                element: <WatchList />
            },
            {
                path: '/tai-khoan',
                element: <Setting />
            },
            {
                path: '/not-found',
                element: <NotFound message="Đi lạc rồi bé ơi." />
            },
            {
                path: '/user',
                element: <LayoutGuest />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: 'verification/:token',
                        element: <Verification />
                    }
                ]
            }
        ]
    },
    {
        path: '/admin',
        element: <LayoutAdmin />,
        children: [
            {
                path: '/admin',
                element: <Navigate to="/admin/dashboard" />
            },
            {
                path: '/admin/dashboard',
                element: <Dashboard />
            },
            {
                path: '/admin/api-movie',
                element: <ApiMovie />
            },
            {
                path: '/admin/new-movie',
                element: <NewMovie />
            },
            {
                path: '/admin/list-users',
                element: <ListUsers />
            },
            {
                path: '/admin/list-movies',
                element: <ListMovies />
            },
            {
                path: '/admin/edit-movie/:slug',
                element: <EditMovie />
            },
            {
                path: '/admin/edit-movie/:slug/episodes',
                element: <Episodes />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;