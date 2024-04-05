import { Routes, Route} from "react-router-dom";
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
import Reviews from "./views/Admin/Reviews/Reviews.jsx";
import ForgotPassword from "./views/Guest/ForgotPassword/ForgotPassword.jsx";
import ProcessChangePass from "./views/Guest/ProcessPassword/ProcessChangePass.jsx";
import ListCategories from "./views/Admin/Categories/ListCategories.jsx";
import RequestMovie from "./views/Movie/Request/RequestMovie.jsx";
import ListRequests from "./views/Admin/ListRequests/ListRequests.jsx";
import ListReports from "./views/Admin/ListReports/ListReports.jsx";
import Setting from "./views/Guest/Setting/Setting.jsx";

export default function App() {
  return (
    <div className="root">
      <Routes>
        <Route path="/" element={<LayoutMovie />}>
          <Route index element={<Home />} />
          <Route path="not-found" element={<NotFound message="Đi lạc rồi bé ơi." />} />
          <Route path="tim-kiem" element={<Filter />} />
          <Route path="xem-sau" element={<WatchList />} />
          <Route path="tai-khoan" element={<Setting />} />
          <Route path="request" element={<RequestMovie />} />
          <Route path="user" element={<LayoutGuest />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verification/:token" element={<Verification />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<ProcessChangePass />} />
          </Route>
          <Route path=":slug" element={<Details />} />
          <Route path=":slug/:episode" element={<WatchMovie />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="api-movie" element={<ApiMovie />} />
          <Route path="new-movie" element={<NewMovie />} />
          <Route path="list-users" element={<ListUsers />} />
          <Route path="list-movies" element={<ListMovies />} />
          <Route path="list-requests" element={<ListRequests />} />
          <Route path="list-reports" element={<ListReports />} />
          <Route path="edit-movie/:slug" element={<EditMovie />} />
          <Route path="edit-movie/:slug/episodes" element={<Episodes />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="categories" element={<ListCategories />} />
        </Route>
      </Routes>
    </div>
  );
}
