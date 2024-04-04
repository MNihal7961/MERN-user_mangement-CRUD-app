import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <nav className="bg-white border-b border-solid border-b-primaryColor m-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="heading text-primaryColor">CRUD</span>
          </Link>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {currentUser && currentUser.photo && (
              <Link to={"/profile"}>
                <figure className="w-[40px] h-[40px] rounded-full cursor-pointer border border-primaryColor text-center">
                  <img
                    src={currentUser?.photo}
                    alt="user-profile"
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </Link>
            )}

            {currentUser && !currentUser.photo && (
              <Link to={'/profile'}>
                <h2 className="font-bold text-primaryColor">
                  {currentUser.name}
                </h2>
              </Link>
            )}

            {!currentUser && (
              <Link to={"/login"}>
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
