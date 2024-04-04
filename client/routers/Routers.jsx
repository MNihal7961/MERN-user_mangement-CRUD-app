import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Profile from "../src/pages/Profile";
import Admin from "../src/pages/Admin";
import { useDispatch, useSelector } from "react-redux";
import { logInSuccess } from "../src/redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../src/config";
import AdminPrivateRoute from "../src/components/AdminPrivateRoute";
import UserPrivateRoute from "../src/components/UserPrivateroute";

axios.defaults.withCredentials = true;

const Routers = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [userData]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/fetchdata`)
      .then((response) => {
        dispatch(logInSuccess(response.data));
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !userData ? (
            <Login />
          ) : userData.role == "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/register"
        element={
          !userData ? (
            <Register />
          ) : userData.role == "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="/" element={<UserPrivateRoute />}>
        <Route index element={<Home />}></Route>
      </Route>

      <Route path="profile" element={userData ? <Profile /> : <Login />} />

      <Route path="/admin" element={<AdminPrivateRoute />}>
        <Route index element={<Admin />}></Route>
      </Route>
    </Routes>
  );
};

export default Routers;
