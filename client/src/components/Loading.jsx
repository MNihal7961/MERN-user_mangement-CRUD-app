import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <HashLoader color="#950740" />
    </div>
  );
};

export default Loading;
