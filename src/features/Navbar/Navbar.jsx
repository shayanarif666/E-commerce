import React, { useEffect, useState } from 'react'
import { Button, Menu, MenuItem, Badge, Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { Divider } from '@mui/material';
import { FaUser } from "react-icons/fa6";
import { AiOutlineBars } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import SearchResults from '../Search Results/SearchResults';
import "./navbar.css"
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/authSlices"

function Navbar() {

    const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));

    // Get Carts
    const cart = JSON.parse(localStorage.getItem("Cart Data")) || [];

    // Get User Data
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Handling Menu bar
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);
    const [value, setValue] = useState("home");

    const open = anchorEl;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Search Results 
    const handleSearchResults = (e) => {
        console.log(e.keyCode);
        const searchValue = e.target.value;
        setSearch(searchValue);
        getAllSearchResults(searchValue);
        if (e.keyCode === 13) {
            navigate(`/products/${searchValue}`);
            setSearch("");
        }
    }

    // Generate Random ID
    const uniqueID = Date.now();

    // Get All Search Results 
    const getAllSearchResults = async (searchValue) => {
        try {
            const response = await fetch("https://dummyjson.com/products?limit=194");
            if (!response.ok) throw new Error("Data could not fetch");
            const { products } = await response.json();
            const searchResults = products.filter((product) => {
                return product.title.toLowerCase().includes(searchValue.toLowerCase().replaceAll(" ", "")) || product.description.toLowerCase().includes(searchValue.toLowerCase().replaceAll(" ", ""))
            }).slice(0, 8);
            setSearchProducts(searchResults);
        } catch (error) {
            console.log(error);
        }
    }

    // Set the initial value based on the current path
    useEffect(() => {
        if (location.pathname === `/account`) {
            setValue("account");
        } else if (location.pathname === "/mobileCategories") {
            setValue("categories");
        } else if (location.pathname === "/cart") {
            setValue("cart");
        } else if (location.pathname === "/dashboard") {
            setValue("admin");
        } else {
            setValue("home");
        }
    }, [location.pathname]);

    const changePath = (path) => {
        navigate(path);
    };

    // Handle Auth
    const handleLogin = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        dispatch(logout(false));
        window.location.reload();
    }


    return (
        <>
            {/* Desktop Navigation Bar */}
            <nav className="navbar navbar-expand-lg d-lg-block d-none">
                <div class="custom-container d-lg-flex align-items-lg-center">
                    <div className="logo">
                        <Link to={`/`} className='d-flex align-items-end' style={{ textDecoration: "none", color: "#000" }}>
                            <img src="https://shopaholicsheaven.co.za/wp-content/uploads/2020/05/cropped-new-logo-1.jpg" alt="" />
                        </Link>
                    </div>
                    <div className="search-container input-group">
                        <input type="text" className='form-control' onKeyUp={(e) => handleSearchResults(e)} placeholder="Search in Shopaholic..." />
                        <div className={`search-results ${searchProducts.length > 0 ? "d-block" : "d-none"}`}>
                            <SearchResults updateSearch={setSearch} searchValue={search} products={searchProducts} />
                        </div>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="buttons navbar-nav">

                            {
                                isAuthenticated ?
                                    <div>

                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <FaUser style={{ fontSize: "2.2rem", color: "#222", backgroundColor: "#f0f5ff", padding: ".5rem", borderRadius: "50%" }}></FaUser>
                                            <div className="user-info">
                                                <small className='ms-2' style={{ color: "#444", fontSize: ".7rem", textTransform: "capitalize" }}>
                                                    Hello,
                                                    <span style={{ textTransform: "lowercase" }}>{user?.email.slice(0, 13)}...</span>
                                                </small>
                                                <h6 className='ms-2' style={{ color: "#444", fontSize: ".75rem", textTransform: "capitalize" }}>Orders & Accounts</h6>
                                            </div>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/profile`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <CgProfile className='me-2' style={{ marginBottom: "0.2rem" }} /> Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/order-tracking/${uniqueID}`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <CiDeliveryTruck className='me-2' style={{ marginBottom: "0.2rem" }} /> Tracking
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/wishlist`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <FaRegHeart className='me-2' style={{ marginBottom: "0.2rem" }} /> Wishlist
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/order-details/${uniqueID}`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <BsBoxSeam className='me-2' style={{ marginBottom: "0.2rem" }} /> Order
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><IoIosLogOut style={{ margin: "0 .8rem .2rem 0" }} /> Logout</MenuItem>
                                        </Menu>
                                    </div>
                                    :
                                    <>
                                        <Button
                                            href=''
                                            onClick={handleLogin}
                                            className='me-2'
                                        >
                                            <FaUser style={{ fontSize: "2.2rem", color: "#222", backgroundColor: "#f0f5ff", padding: ".5rem", borderRadius: "50%" }}></FaUser>
                                            <div className="user-info">
                                                <small className='ms-2' style={{ color: "#444", fontSize: ".7rem", textTransform: "capitalize" }}>
                                                    Account,
                                                </small>
                                                <h6 className='ms-2' style={{ color: "#444", fontSize: ".75rem", textTransform: "capitalize" }}>Sign In</h6>
                                            </div>
                                        </Button>
                                        <Divider orientation="vertical" variant="middle" flexItem style={{ backgroundColor: "#222" }} />
                                    </>
                            }

                            <Link to={`/cart`} className='me-3 nav-link d-flex align-items-center'>
                                {
                                    cart.length > 0 ? <Box sx={{ color: 'action.active', marginRight: ".5rem", marginBottom: ".2rem" }}>
                                        <Badge color="secondary" badgeContent={cart.length}>
                                            <PiShoppingCartSimpleFill style={{ color: "#222", fontSize: "1.7rem" }} />
                                        </Badge>
                                    </Box> : <PiShoppingCartSimpleFill style={{ fontSize: "1.7rem", marginRight: ".5rem", marginBottom: ".2rem" }} />
                                }
                                <span>Cart</span>
                            </Link>

                            {
                                isAuthenticated && user?.email === 'shayanarif666@gmail.com' ?
                                    <>
                                        <Divider orientation="vertical" variant="middle" flexItem style={{ backgroundColor: "#222" }} />
                                        <Link to={`/dashboard`} className='mx-2 nav-link d-flex align-items-center'>
                                            <MdDashboard style={{ fontSize: "1.5rem", marginRight: ".5rem", marginBottom: ".2rem" }} />Admin
                                        </Link>
                                    </>
                                    :
                                    <></>
                            }

                        </div>
                    </div>
                </div>
            </nav>

            {/* Tablet Screen Navigation Bar */}
            <nav className="tablet-navbar d-lg-none d-md-block d-none">
                <div className="custom-container">

                    <div className="d-flex align-items-center justify-content-between">

                        <div className="logo">
                            <Link to={`/`} className='d-flex align-items-end' style={{ textDecoration: "none", color: "#000" }}>
                                <img src="https://shopaholicsheaven.co.za/wp-content/uploads/2020/05/cropped-new-logo-1.jpg" alt="" />
                            </Link>
                        </div>

                        <div className="menu-icons d-md-flex align-items-md-center d-none">
                            {
                                isAuthenticated ?
                                    <div>

                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <FaUser className='user-icon'></FaUser>
                                            <div className="user-info">
                                                <small className='ms-2' style={{ color: "#444", fontSize: ".7rem", textTransform: "capitalize" }}>
                                                    Hello,
                                                    <span style={{ textTransform: "lowercase" }}>{user?.email.slice(0, 13)}...</span>
                                                </small>
                                                <h6 className='ms-2' style={{ color: "#444", fontSize: ".75rem", textTransform: "capitalize" }}>Orders & Accounts</h6>
                                            </div>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/profile`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <CgProfile className='me-2' style={{ marginBottom: "0.2rem" }} /> Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/order-tracking/${uniqueID}`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <CiDeliveryTruck className='me-2' style={{ marginBottom: "0.2rem" }} /> Tracking
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/wishlist`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <FaRegHeart className='me-2' style={{ marginBottom: "0.2rem" }} /> Wishlist
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2'>
                                                <Link to={`/order-details/${uniqueID}`} className='me-3 nav-link' style={{ textDecoration: "none" }}>
                                                    <BsBoxSeam className='me-2' style={{ marginBottom: "0.2rem" }} /> Order
                                                </Link>
                                            </MenuItem>
                                            <MenuItem className='ps-3 pe-5 py-2' onClick={handleLogout}><IoIosLogOut style={{ margin: "0 .8rem .2rem 0" }} /> Logout</MenuItem>
                                        </Menu>
                                    </div>
                                    :
                                    <>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleLogin}
                                            className='me-2'
                                        >
                                            <FaUser style={{ fontSize: "3rem", color: "#222", backgroundColor: "#f0f5ff", padding: ".3rem", borderRadius: "50%" }}></FaUser>
                                            <div className="user-info">
                                                <small className='ms-2' style={{ color: "#444", fontSize: ".7rem", textTransform: "capitalize" }}>
                                                    Account,
                                                </small>
                                                <h6 className='ms-2' style={{ color: "#444", fontSize: ".75rem", textTransform: "capitalize" }}>Sign In</h6>
                                            </div>
                                        </Button>
                                        <Divider orientation="vertical" variant="middle" className='me-3' flexItem style={{ backgroundColor: "#222" }} />
                                    </>
                            }

                            <Link to={`/cart`} className='me-3 nav-link d-flex align-items-center'>
                                {
                                    cart.length > 0 ? <Box sx={{ color: 'action.active', marginRight: ".5rem", marginBottom: ".2rem" }}>
                                        <Badge color="secondary" badgeContent={cart.length}>
                                            <PiShoppingCartSimpleFill style={{ color: "#222", fontSize: "1.7rem" }} />
                                        </Badge>
                                    </Box> : <PiShoppingCartSimpleFill style={{ fontSize: "1.7rem", marginRight: ".5rem", marginBottom: ".2rem" }} />
                                }
                                <span style={{ fontSize: ".9rem", fontWeight: 600 }}>Cart</span>
                            </Link>

                            {
                                user?.email === 'shayanarif666@gmail.com' ?
                                    <>
                                        <Divider orientation="vertical" variant="middle" flexItem style={{ backgroundColor: "#222" }} />
                                        <Link to={`/dashboard`} className='mx-2 nav-link d-flex align-items-center'>
                                            <MdDashboard style={{ fontSize: "1.5rem", marginRight: ".5rem", marginBottom: ".2rem" }} />
                                            <span style={{ fontSize: ".9rem", fontWeight: 600 }}>Admin</span>
                                        </Link>
                                    </>
                                    :
                                    <></>
                            }

                        </div>
                    </div>

                    <div className="search-container input-group mt-3">
                        <input type="text" className='form-control' onKeyUp={(e) => handleSearchResults(e)} placeholder="Search in Shopaholic..." />
                        <div className={`search-results ${searchProducts.length > 0 ? "d-block" : "d-none"}`}>
                            <SearchResults updateSearch={setSearch} searchValue={search} products={searchProducts} />
                        </div>
                    </div>

                </div>
            </nav>

            {/* Mobile Screen Bottom Navigation Bar */}
            <nav className="mobile-navbar d-md-none d-block p-3">
                <div className="search-container search-mobile-container input-group">
                    <input type="text" className='form-control' onKeyUp={(e) => handleSearchResults(e)} placeholder="Search in Shopaholic..." />
                    <div className={`search-results ${searchProducts.length > 0 ? "d-block" : "d-none"}`}>
                        <SearchResults updateSearch={setSearch} searchValue={search} products={searchProducts} />
                    </div>
                </div>
                <div className="bottom-navbar">
                    <BottomNavigation sx={{ width: "100%" }} value={value} onChange={(event, newValue) => setValue(newValue)}>
                        <BottomNavigationAction
                            label="Home"
                            value="home"
                            onClick={() => changePath("/")}
                            icon={<IoHome />}
                        />
                        <BottomNavigationAction
                            label="Categories"
                            value="categories"
                            onClick={() => changePath("/mobileCategories")}
                            icon={<AiOutlineBars />}
                        />
                        <BottomNavigationAction
                            label="Cart"
                            value="cart"
                            onClick={() => changePath("/cart")}
                            icon={<PiShoppingCartSimpleFill />}
                        />
                        <BottomNavigationAction
                            label="Account"
                            value="account"
                            onClick={() => changePath(`/account`)}
                            icon={<CgProfile />}
                        />
                        {
                            isAuthenticated ?
                                <BottomNavigationAction
                                    label="admin"
                                    value="admin"
                                    className='d-sm-flex d-none'
                                    onClick={() => changePath("/dashboard")}
                                    icon={<MdDashboard />}
                                />
                                :
                                <></>
                        }
                    </BottomNavigation>
                </div>
            </nav>
        </>
    )
}

export default Navbar
