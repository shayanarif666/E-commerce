import React, { useState } from 'react'
import { Grid } from '@mui/material';
import { ProfileInformation, ProfileOrders, ProfileSideBar } from "../index"
import { useAuth0 } from '@auth0/auth0-react';
import "./profile.css";

function Profile() {

    // authentication
    const user = JSON.parse(localStorage.getItem("user"));

    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <>
            {
                user ?
                    <div className='row mx-2 g-2 d-flex' style={{ margin: "5rem 0" }}>
                        <div className="col-sm-4 col-lg-3">
                            <ProfileSideBar user={user} tabIndex={tabIndex} handleTabChange={handleTabChange} />
                        </div>
                        <div className='col-sm-8 col-lg-8 '>
                            {tabIndex === 0 && <ProfileInformation user={user} />}
                            {tabIndex === 1 && <ProfileOrders />}
                        </div>
                    </div> : <></>
            }
        </>
    )
}

export default Profile
