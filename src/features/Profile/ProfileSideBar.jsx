import React, { useState } from 'react'
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import { MdDashboard, MdShoppingCart, MdPerson, MdLocationOn, MdExitToApp, } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';
import "./profile.css";

function ProfileSideBar({ user, tabIndex, handleTabChange }) {
    return (
        <>
            <Box className="bg-white d-sm-block d-flex align-items-center justify-content-around me-lg-3">
                <Box display="flex" flexDirection="column" alignItems="center" padding="20px">
                    <h4 style={{fontFamily: "Arial, Helvetica, sans-serif"}} className='mt-2 text-center'>Muhammad Shayan</h4>
                </Box>

                <Divider className='d-sm-block d-none' sx={{ bgcolor: "#999" }}></Divider>
                <Divider orientation="vertical" className='d-lg-none d-block' variant="middle" flexItem sx={{ bgcolor: "#999" }}></Divider>

                <Tabs
                    orientation="vertical"
                    value={tabIndex}
                    onChange={handleTabChange}
                    aria-label="Sidebar Tabs"
                    sx={{ my: 2 }}
                >
                    <Tab label="Personal Information" style={{ margin: "auto" }} />
                    <Tab label="My Orders" style={{ margin: "auto" }} />
                </Tabs>
            </Box>
        </>
    )
}

export default ProfileSideBar
