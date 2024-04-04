import React from "react";

const Home = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          This is an simple
          <span className="text-primaryColor"> CRUD </span>
          application
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          A CRUD app developed with Tailwind CSS, React, Node.js, and MongoDB
          for efficient data management and user interaction.
        </p>
      </div>
    </>
  );
};

export default Home;
