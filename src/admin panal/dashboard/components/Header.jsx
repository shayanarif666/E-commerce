import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from '@mui/material';
import { IoIosMenu } from "react-icons/io";
import { MdOutlineEmail, MdOutlineNotifications } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import "./css/dashboard.css"

function Header({ margin, setAsideOpen, asideOpen }) {
    return (
        <AppBar position='static' sx={{ bgcolor: '#fff', color: "#222", margin: `${margin}`, width: "100%" }}>
            <Toolbar>
                <IconButton className='d-lg-none d-block' edge="start" color="inherit">
                    <IoIosMenu onClick={() => setAsideOpen(!asideOpen)} />
                </IconButton>

                <Box sx={{ marginLeft: "1rem" }}>
                    <div className="search-bar-container">
                        <input type="search" className='form-control search-box' placeholder='Type Text...' />
                        <div className="search-icon">
                            <FiSearch />
                        </div>
                    </div>
                </Box>

                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit">
                    <MdOutlineEmail />
                </IconButton>
                <IconButton color="inherit">
                    <MdOutlineNotifications />
                </IconButton>
                <IconButton color="inherit">
                    <IoSettingsOutline className='setting-icon' />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Avatar alt="Maman Ketoprak" src="/static/images/avatar/1.jpg" />
                    <div className="text">
                        <small>Admin</small>
                        <p>Muhammad Shayan</p>
                    </div>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header
