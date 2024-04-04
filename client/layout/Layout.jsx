import React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Routers from "../routers/Routers";


const Layout = () => {
    
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
