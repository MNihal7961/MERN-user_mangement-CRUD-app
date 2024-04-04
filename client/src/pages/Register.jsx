import React, { useState } from "react";
import upload from "../utils/uploadImages";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [picLoad, setPicLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "user",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setPicLoad(true);
    const data = await upload(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setPicLoad(false);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !formData.name &&
      !formData.email &&
      !formData.password &&
      !formData.gender
    ) {
      setLoading(false);
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.name || formData.name.length < 3) {
      setLoading(false);
      toast.error("Please enter a valid name");
      return;
    }

    if (formData.name.includes(" ")) {
      setLoading(false);
      toast.error("Name cannot contain spaces");
      return;
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      setLoading(false);
      toast.error("Please enter a valid email");
      return;
    }

    if (!formData.password) {
      setLoading(false);
      toast.error("Please fill the password field");
      return;
    }

    if (!formData.gender) {
      setLoading(false);
      toast.error("Please select the gender field");
      return;
    }

    if (formData.password.length < 6) {
      setLoading(false);
      toast.warning("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);

      toast.success(message);

      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Create an <span className="text-primaryColor">Account</span> 👨🏻‍💻
          </h3>
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
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer required:"
              />
            </div>
            <div className="flex items-center justify-between mb-5">
              <label className="text-headingColor font-bold txet-[16px] leading-7">
                Role :
                <select
                  value={formData.role}
                  onChange={handleInputChange}
                  name="role"
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label className="text-headingColor font-bold txet-[16px] leading-7">
                Gender :
                <select
                  value={formData.gender}
                  onChange={handleInputChange}
                  name="gender"
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                >
                  <option value="">Choose</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            <div className="mb-5 flex items-center gap-3">
              {selectedFile && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={previewURL}
                    alt="preview"
                    className="w-full  h-full rounded-full p-2"
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
                  className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer text-center"
                >
                  {picLoad ? <PulseLoader size={15} /> : "Upload Photo"}
                </label>
              </div>
            </div>
            <div className="mt-7">
              <button
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                type="submit"
              >
                {loading ? (
                  <PulseLoader color="#ffffff" size={10} />
                ) : (
                  "Register Now"
                )}
              </button>
            </div>
            <p className="text-textColor mt-5 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primaryColor font-medium ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
