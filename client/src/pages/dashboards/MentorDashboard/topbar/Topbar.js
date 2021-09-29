/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "./Topbar.css";
import {
   NotificationsNone,
   Message,
   Logout,
   } from "@mui/icons-material";


const Topbar = () => {



  return (

    <div className='topbar'>
      <div className='topbarwapper'>
        <div className='topleft'>
          <span className='logo'>WELCOME MENTOR</span>
        </div>
        <div className='topright'>
          <div className='topbarIconContainer'>
            <NotificationsNone />
            <span className='topIconBadge'>8</span>
          </div>
          <div className='topbarIconContainer'>
            <Message />
            <span className='topIconBadge'>8</span>
          </div>
          <div className='topbarIconContainer'>
            <Logout />
          </div>
          <img src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' alt='Profile logo' className='topAvatar' />
        </div>
      </div>
    </div>
  );

};

export default Topbar;