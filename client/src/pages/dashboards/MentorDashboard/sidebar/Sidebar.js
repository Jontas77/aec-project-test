import React from "react";
import "./Sidebar.css";
import {
        HomeSharp,
        GroupsRounded,
        FiberNew,
        CastConnectedRounded,
        HourglassTopRounded,
        AutoGraph,
        DashboardSharp,
        AccountTreeSharp,
       } from "@mui/icons-material";

const Sidebar = () => {

  // {
  //   page === "profile" ? (
  //   <Profile />
  // ) : page === "projects" ? (
  //   <Projects setPage={setPage} />
  // ) : page === "competitions" ? (
  //   <Competitions setPage={setPage} />
  // ) : (

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>
          <DashboardSharp />
          Dashboard</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem active'>
              <HomeSharp />
              Home
            </li>
            <li className='sidebarListItem active'>
              <GroupsRounded />
              Students
            </li>
          </ul>
        </div>
        <hr className='lineBreak' />
        <br />
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>
          <AccountTreeSharp />
          Projects</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem active' >
              <FiberNew onClick={() => setPage("projects")} />
              Projects
            </li>
            <li className='sidebarListItem active'>
              <HourglassTopRounded />
               Active Projects
            </li>
            <li className='sidebarListItem active'>
              <CastConnectedRounded />
              Reviewed Projects
            </li>
            <li className='sidebarListItem active'>
              <AutoGraph />
              Competitions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;