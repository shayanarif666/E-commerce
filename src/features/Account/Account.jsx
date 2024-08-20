import { Container, Divider, List, ListItem, ListItemButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import "./account.css";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/authSlices"

function Account() {

    const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Generate Random ID
    const uniqueID = Date.now();

    const handleLogout = () => {
        dispatch(logout(false));
        window.location.reload();
    }

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        isAuthenticated ?
            <Container sx={{ mt: 4 }}>
                <h4 className='heading mb-4'>Account</h4>

                <nav>
                    <Link to={`/profile`} style={{ textDecoration: "none", color: "#000" }}>
                        <List className='bg-white'>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ padding: "1rem" }}>
                                    <FaRegUser style={{ color: "#666", marginRight: ".7rem" }}></FaRegUser>
                                    <h5 style={{ color: "#666", fontWeight: 500, fontSize: "1rem", marginBottom: "0rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>My Profile</h5>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Link>
                </nav>
                <Divider />
                <nav>
                    <Link to={`/order-details/${uniqueID}`} style={{ textDecoration: "none", color: "#000" }}>
                        <List className='bg-white'>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ padding: "1rem" }}>
                                    <FaBoxOpen style={{ color: "#666", marginRight: ".7rem" }}></FaBoxOpen>
                                    <h5 style={{ color: "#666", fontWeight: 500, fontSize: "1rem", marginBottom: "0rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>My Orders</h5>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Link>
                </nav>
                <Divider />
                <nav>
                    <Link to={`/order-tracking/${uniqueID}`} style={{ textDecoration: "none", color: "#000" }}>
                        <List className='bg-white'>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ padding: "1rem" }}>
                                    <TbTruckDelivery style={{ color: "#666", marginRight: ".7rem" }}></TbTruckDelivery>
                                    <h5 style={{ color: "#666", fontWeight: 500, fontSize: "1rem", marginBottom: "0rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Order Tracking</h5>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Link>
                </nav>
                <Divider />
                <nav>
                    <Link to={`/wishlist`} style={{ textDecoration: "none", color: "#000" }}>
                        <List className='bg-white'>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ padding: "1rem" }}>
                                    <FaRegHeart style={{ color: "#666", marginRight: ".7rem" }}></FaRegHeart>
                                    <h5 style={{ color: "#666", fontWeight: 500, fontSize: "1rem", marginBottom: "0rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>My Wishlist</h5>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Link>
                </nav>
                <Divider />
                <nav>
                    <List className='bg-white' onClick={handleLogout} >
                        <ListItem disablePadding>
                            <ListItemButton sx={{ padding: "1rem" }}>
                                <IoIosLogOut style={{ color: "#666", marginRight: ".7rem" }}></IoIosLogOut>
                                <h5 style={{ color: "#666", fontWeight: 500, fontSize: "1rem", marginBottom: "0rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Logout Account</h5>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>

            </Container>
            :
            <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                <div>
                    <p className='fw-bold' style={{ fontSize: "1.5rem", fontFamily: "sans-serif" }}>Login to View Your Items.</p>
                    <Link to={`/`} className='btn btn-main shadow me-3'>Go Back To Home</Link>
                    <button className='btn btn-secondary shadow' onClick={handleLogin}>Login Your Account</button>
                </div>
            </div>
    )
}

export default Account
