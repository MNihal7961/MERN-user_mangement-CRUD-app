import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Settings from "../components/Settings";
import ResetPassword from "../components/ResetPassword";
import { BASE_URL } from "../config";
import axios from "axios";
import { signOut } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/nopic.png";

const Profile = () => {
  const [tab, setTab] = useState("settings");
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.get(`${BASE_URL}/auth/logout`).then(() => {
        dispatch(signOut());
        navigate("/login");
        toast.success("Logout Success");
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      axios
        .delete(`${BASE_URL}/user/deleteaccount/${currentUser._id}`)
        .then(() => {
          dispatch(signOut());
          navigate("/login");
          toast.success("User Deleted");
        });
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor ">
                <img
                  src={currentUser.photo ? currentUser.photo : avatar}
                  alt="profile"
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                {currentUser?.name}
              </h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {currentUser?.email}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                Gender: {currentUser?.gender}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                Role:{" "}
                <span className=" ml-2 text-headingColor text-[22px] leading-8">
                  {currentUser?.role}
                </span>
              </p>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
              <button
                onClick={handleLogout}
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Logout
              </button>
              <button
                onClick={handleDelete}
                className="w-full bg-red-600  p-3 text-[16px] leading-7 rounded-md mt-4 text-white"
              >
                Delete Account{" "}
              </button>
            </div>
          </div>
          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("settings")}
                className={` ${
                  tab === "settings" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setTab("reset")}
                className={`${
                  tab === "reset" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Reset Password
              </button>
            </div>
            {tab === "reset" && <ResetPassword user={currentUser} />}
            {tab === "settings" && <Settings user={currentUser} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
