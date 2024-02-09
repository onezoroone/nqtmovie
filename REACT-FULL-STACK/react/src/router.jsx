import {Navigate, createBrowserRouter} from "react-router-dom";
import Home from "./views/Movie/Home.jsx";
import ComicHome from "./views/Comic/ComicHome.jsx";
import ViewComic from "./views/Comic/ViewComic.jsx";
import DetailsComic from "./views/Comic/DetailsComic.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import GuestLayout from "./components/Layouts/GuestLayout.jsx";
import MovieLayout from "./components/Layouts/MovieLayout.jsx";
import ComicLayout from "./components/Layouts/ComicLayout.jsx";
import DetailsMovie from "./views/Movie/DetailsMovie.jsx";
import ViewMovie from "./views/Movie/ViewMovie.jsx";
import AllMovie from "./views/Movie/AllMovie.jsx";
import Setting from "./views/Setting.jsx";
import Filter from "./views/Movie/Filter.jsx";
import WatchList from "./views/Movie/WatchList.jsx";
import AdminLayout from "./components/Layouts/AdminLayout.jsx";
import Dashboard from "./views/Admin/Dashboard.jsx";
import APIComic from "./views/Admin/APIComic.jsx";
import UserList from "./views/Admin/UserList.jsx";
import AddCategory from "./views/Admin/AddCategory.jsx";
import CategoryList from "./views/Admin/CategoryList.jsx";
import MovieList from "./views/Admin/MovieList.jsx";
import AddMovie from "./views/Admin/AddMovie.jsx";
import EditMovie from "./views/Admin/EditMovie.jsx"
import Episode from "./views/Admin/Episodes.jsx"
import APIMovie from "./views/Admin/APIMovie.jsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MovieLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/movie/:dynamicPath/:dynamicPath',
                element: <DetailsMovie />
            },
            {
                path: '/movie/:dynamicPath/:dynamicPath/:dynamicPath/:dynamicPath',
                element: <ViewMovie />
            },
            {
                path: '/viewall',
                element: <AllMovie />
            },
            {
                path: '/setting',
                element: <Setting />
            },
            {
                path: '/search',
                element: <Filter />
            },
            {
                path: '/watchlist',
                element: <WatchList />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '/comic',
        element: <ComicLayout />,
        children: [
            {
                path: '/comic',
                element: <ComicHome />
            },
            {
                path: ':dynamicPath/:dynamicPath',
                element: <DetailsComic />
            },
            {
                path: ':dynamicPath/:dynamicPath/:dynamicPath/:dynamicPath',
                element: <ViewComic />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children:[
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'getcomic',
                element: <APIComic />
            },
            {
                path: 'users',
                element: <UserList />
            },
            {
                path: 'category/add',
                element: <AddCategory />
            },
            {
                path: 'category',
                element: <CategoryList />
            },
            {
                path: 'movie/add',
                element: <AddMovie />
            },
            {
                path: 'movies',
                element: <MovieList />
            },
            {
                path: 'movie/edit/:dynamicPath',
                element: <EditMovie/>
            },
            {
                path: 'movie/edit/episodes/:dynamicPath',
                element: <Episode />
            },
            {
                path: 'movie/api',
                element: <APIMovie />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])

export default router;
