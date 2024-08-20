import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, ListItemButton, Collapse } from '@mui/material';
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { SlHandbag } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoBagAdd } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GoDot } from "react-icons/go";
import "./css/dashboard.css"

const Sidebar = ({ isAsideOpen, setAsideOpen, width, transform, transition }) => {

    const [openProducts, setOpenProducts] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [openCustomers, setOpenCustomers] = useState(false);
    const [openOrders, setOpenOrders] = useState(false);

    const handleProductsClick = () => {
        setOpenProducts(!openProducts);
    };
    const handleCategoryClick = () => {
        setOpenCategories(!openCategories);
    };
    const handleCustomerClick = () => {
        setOpenCustomers(!openCustomers);
    };
    const handleOrderClick = () => {
        setOpenOrders(!openOrders);
    };

    return (
        <div className='border aside' style={{ width: `${width}`, height: `100vh`, transform: `translate(${transform})`, transition: `${transition}` }}>
            {/* Desktop Version */}

            <List>

                <div className="text-end mb-3 mt-2 d-lg-none d-block">
                    <RxCross2 onClick={() => setAsideOpen(false)} style={{ fontSize: "1.7rem", marginRight: "1rem", cursor: "pointer" }} />
                </div>

                <ListItem className='mb-3 text-center'>
                    <Link to={`/`} style={{ textDecoration: "none" }}>
                        <ListItemAvatar >
                            <img src="https://shopaholicsheaven.co.za/wp-content/uploads/2020/05/cropped-new-logo-1.jpg" style={{ display: "block", width: "220px", height: "80px", marginLeft: "-.5rem" }} alt="" />
                        </ListItemAvatar>
                    </Link>
                </ListItem>

                <div className="p-3">

                    {/* Home Navigation */}
                    <Link to={`/dashboard`} style={{ color: "#333", textDecoration: "none" }}>
                        <ListItemButton sx={{ display: "flex", alignItems: "center", marginBottom: ".7rem" }}>
                            <ListItemIcon><FaHome className='me-2' /></ListItemIcon>
                            <h6 style={{ marginLeft: "-1.7rem", marginBottom: "0rem", fontSize: ".8rem" }}>Home</h6>
                        </ListItemButton>
                    </Link>

                    {/* Product Navigation */}

                    <ListItemButton onClick={handleProductsClick} sx={{ marginBottom: ".7rem" }}>
                        <ListItemIcon>
                            <MdOutlineProductionQuantityLimits className='me-2' />
                        </ListItemIcon>
                        <h6 style={{ marginLeft: "-1.7rem", marginBottom: "0rem", fontSize: ".8rem" }}>Products</h6>
                        {openProducts ? <IoIosArrowDown className='ms-auto' /> : <IoIosArrowForward className='ms-auto' />}
                    </ListItemButton>

                    <Collapse in={openProducts} timeout="auto" unmountOnExit sx={{marginBottom: ".7rem"}}>
                        <List component="div" disablePadding>
                            <Link to={`/dashboard/addProduct`} style={{ color: "#333", textDecoration: "none" }}>
                                <ListItemButton sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <GoDot />
                                    </ListItemIcon>
                                    <h6 style={{ marginLeft: "-2rem", marginBottom: "0rem", fontSize: ".8rem" }}>Add Product</h6>
                                </ListItemButton>
                            </Link>
                            <Link to={`/dashboard/viewProduct`} style={{ color: "#333", textDecoration: "none" }}>
                                <ListItemButton sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <GoDot />
                                    </ListItemIcon>
                                    <h6 style={{ marginLeft: "-2rem", marginBottom: "0rem", fontSize: ".8rem" }}>View Product</h6>
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>

                    {/* Category Navigation */}

                    <ListItemButton onClick={handleCategoryClick} sx={{ marginBottom: ".7rem" }}>
                        <ListItemIcon>
                            <TbCategory className='me-2' />
                        </ListItemIcon>
                        <h6 style={{ marginLeft: "-1.7rem", marginBottom: "0rem", fontSize: ".8rem" }}>Category</h6>
                        {openCategories ? <IoIosArrowDown className='ms-auto' /> : <IoIosArrowForward className='ms-auto' />}
                    </ListItemButton>

                    <Collapse in={openCategories} timeout="auto" unmountOnExit sx={{marginBottom: ".7rem"}}>
                        <List component="div" disablePadding>
                            <Link to={`/dashboard/viewCategory`} style={{ color: "#333", textDecoration: "none" }}>
                                <ListItemButton sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <GoDot />
                                    </ListItemIcon>
                                    <h6 style={{ marginLeft: "-2rem", marginBottom: "0rem", fontSize: ".8rem" }}>View Category</h6>
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>

                    {/* Customers Navigation */}

                    <ListItemButton onClick={handleCustomerClick} sx={{ marginBottom: ".7rem" }}>
                        <ListItemIcon>
                            <FaUsers className='me-2' />
                        </ListItemIcon>
                        <h6 style={{ marginLeft: "-1.7rem", marginBottom: "0rem", fontSize: ".8rem" }}>Customers</h6>
                        {openCustomers ? <IoIosArrowDown className='ms-auto' /> : <IoIosArrowForward className='ms-auto' />}
                    </ListItemButton>

                    <Collapse in={openCustomers} timeout="auto" unmountOnExit sx={{marginBottom: ".7rem"}}>
                        <List component="div" disablePadding>
                            <Link to={`/dashboard/addCustomer`} style={{ color: "#333", textDecoration: "none" }}>
                                <ListItemButton sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <GoDot />
                                    </ListItemIcon>
                                    <h6 style={{ marginLeft: "-2rem", marginBottom: "0rem", fontSize: ".8rem" }}>Add Customer</h6>
                                </ListItemButton>
                            </Link>
                            <Link to={`/dashboard/viewCustomer`} style={{ color: "#333", textDecoration: "none" }}>
                                <ListItemButton sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <GoDot />
                                    </ListItemIcon>
                                    <h6 style={{ marginLeft: "-2rem", marginBottom: "0rem", fontSize: ".8rem" }}>View Customer</h6>
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>

                    {/* Orders Navigation */}

                    <ListItemButton onClick={handleOrderClick} sx={{ marginBottom: ".7rem" }}>
                        <ListItemIcon>
                            <TbCategory className='me-2' />
                        </ListItemIcon>
                        <h6 style={{ marginLeft: "-1.7rem", marginBottom: "0rem", fontSize: ".8rem" }}>Orders</h6>
                        {openOrders ? <IoIosArrowDown className='ms-auto' /> : <IoIosArrowForward className='ms-auto' />}
                    </ListItemButton>

                    <Collapse in={openOrders} timeout="auto" unmountOnExit sx={{marginBottom: ".7rem"}}>
                        <List component="div" disablePadding>
                            <Link to={`/dashboard/orders`} style={{ color: "#333", textDecoration: "none" }}>
                                <ListItemButton sx={{ pl: 3 }}>
                                    <ListItemIcon>
                                        <GoDot />
                                    </ListItemIcon>
                                    <h6 style={{ marginLeft: "-2rem", marginBottom: "0rem", fontSize: ".8rem" }}>View Orders</h6>
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>
                </div>

            </List>
        </div>
    );
};

export default Sidebar;