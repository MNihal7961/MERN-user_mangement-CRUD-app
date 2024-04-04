import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../config";
import { updateUserFailure, updateUserSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Settings = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URL}/user/resetpassword/${user._id}`,
        formData
      );
      const data = res.data;
      console.log(data, "this is data");
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        setLoading(false);
        toast.error("Update Password Failed");
        return;
      }
      dispatch(updateUserSuccess(data));
      setLoading(false);
      toast.success("Update password Success");
    } catch (err) {
      setLoading(false);
      dispatch(updateUserFailure(err));
      toast.error("Update Password Failed");
    }
  };

  return (
    <div className="mt-10 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            autoComplete="off"
            type="password"
            placeholder="Enter your account password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
          />
        </div>

        <div className="mb-5">
          <input
            autoComplete="off"
            type="password"
            placeholder="Enter your new password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
          />
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            type="submit"
          >
            {loading ? (
              <HashLoader size={25} color="#ffffff" className="text-center" />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
