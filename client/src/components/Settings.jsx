import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../utils/uploadImages";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../config";
import { updateUserFailure, updateUserSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Settings = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [picLoad, setPicLoad] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      name: user.name,
      photo: user.photo,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setPicLoad(true)
    const data = await uploadImageToCloudinary(file);
    console.log(data);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    setPicLoad(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/user/editprofile/${user._id}`,formData);
      const data = res.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        toast.error("Update Failed");
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success("Update Success");
    } catch (err) {
      dispatch(updateUserFailure(err));
      toast.error("Update Failed");
    }
  };

  return (
    <div className="mt-10 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter your full name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
          />
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="avatar"
                className="w-full h-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg,.png,"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {picLoad? <HashLoader color="#000000" size={20}/> : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            type="submit"
          >
            {loading ? <HashLoader size={25} color="#ffffff" className="text-center" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
