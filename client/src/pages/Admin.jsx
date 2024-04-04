import React, { useState } from "react";
import AddUser from "../components/AddUser";
import AllUsers from "../components/AllUsers";


const Admin = () => {
  const [tab, setTab] = useState("alluser");
  return (
    <>
     
        <div className="flex items-center justify-center">
          <div>
            <button
              onClick={() => setTab("alluser")}
              className={` ${
                tab === "alluser" && "bg-primaryColor text-white font-normal"
              } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
            >
              All Users
            </button>
            <button
              onClick={() => setTab("add")}
              className={`${
                tab === "add" && "bg-primaryColor text-white font-normal"
              } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
            >
              Add User
            </button>
          </div>
        </div>
        <div>
          {tab === "alluser" && <AllUsers />}
          {tab === "add" && <AddUser />}
        </div>
     
    </>
  );
};

export default Admin;
