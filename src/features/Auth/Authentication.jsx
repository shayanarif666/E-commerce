import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

function Authentication() {

    const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));
    const navigate = useNavigate();

    return (
        <>
            {
                isAuthenticated ?
                    <Outlet></Outlet>
                    :
                    <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "1000px" }}>
                        <div>
                            <p className='fw-bold' style={{ fontSize: "1.5rem", fontFamily: "sans-serif" }}>Login to View Your Items.</p>
                            <Link to={`/`} className='btn btn-main shadow me-3'>Go Back To Home</Link>
                            <button className='btn btn-secondary shadow' onClick={() => navigate("/login")}>Login Your Account</button>
                        </div>
                    </div>

            }
        </>
    )
}

export default Authentication;
