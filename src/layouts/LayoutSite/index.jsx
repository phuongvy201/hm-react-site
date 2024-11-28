import { Outlet} from "react-router-dom";
import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const LayoutSite = () => {
 
  return (
    <>
      <div className="roboto-regular">
        <Header />
        <Navbar/>
       <Outlet />

      <Footer />
      
      </div>
     

    </>
  )
};

export default LayoutSite;