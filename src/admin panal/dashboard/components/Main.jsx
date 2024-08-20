import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Breadcrumbs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { RiMoneyDollarCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { OrderStatus, TotalRevenue } from '../../index';
import { BackDropLoader } from '../../../features';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import "./css/dashboard.css"

function Main() {

    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Get Orders 
    const orders = JSON.parse(localStorage.getItem("Order"));

    // Get New Products
    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products`);
            if (!response.ok) throw new Error("Something went wrong");
            const { products } = await response.json();
            setProducts(products);
            setFilteredProducts(products);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError("Error in Admin Panal :: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    // Get Status
    const getOrderStatus = (status) => {
        switch (status) {
            case "PENDING":
                return <OrderStatus status={status} />
            case "CONFIRMED":
                return <OrderStatus status={status} />
            case "PICKED BY COURIER":
                return <OrderStatus status={status} />
            case "ON THE WAY":
                return <OrderStatus status={status} />
            case "DELIVERED":
                return <OrderStatus status={status} />
            default:
                return <OrderStatus status={"CANCELLED"} />
        }
    }

    // Calculate Discount
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };

    // Delete
    const handleDelete = (id) => {
        const newProducts = products.filter((product) => product.id !== id);
        // Notification Msg
        toast.success("Successfully Delete Product", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        setTimeout(() => {
            setFilteredProducts(newProducts);
        }, 2500)
    }

    return (
        <Grid container sx={{ mt: 5, mb: 0, px: 3 }}>

            {/* Loading State */}
            {
                loading && <BackDropLoader />
            }

            {/* Error State */}
            {
                error && <p className='text-danger'>{error}</p>
            }

            {/* Dashboard Heading */}
            <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
                <h2 className='dashboard-heading mb-4'>Dashboard</h2>
                <div className="d-sm-block d-none">
                    <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
                        <Typography className='breadcrumb-item' color="inherit" href="/">
                            Shopaholic Heaven
                        </Typography>
                        <Typography className='breadcrumb-item-active' color="text.primary">Dashboard</Typography>
                    </Breadcrumbs>
                </div>
            </Grid>


            {/* Dashboard Stats */}
            <Grid item xs={12} md={6} lg={8}>
                <div className="revenue-sales me-3 mb-4">
                    <div className="border p-3">
                        <h6 style={{ marginBottom: "-.1rem" }}>Revenue Status</h6>
                    </div>
                    <div className="border p-3">
                        <TotalRevenue />
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='mb-4'>
                <Grid item sx={12}>
                    <div className="border d-flex align-items-center justify-content-center p-4 revenue-count-container">
                        <RiMoneyDollarCircleFill />
                        <div className="revenue-count">
                            <h4>$ 1850.00</h4>
                            <span>Total Revenue</span>
                        </div>
                    </div>
                </Grid>

                <div className='d-flex mt-3'>
                    <div className="border p-3 today-revenue-container w-100 me-3">
                        <div className="today-revenue-count text-center mt-1">
                            <h4>$ 24,500</h4>
                            <span>Today Revenue</span>
                        </div>
                    </div>

                    <div className="border p-3 order-count-container w-100">
                        <div className="order-count text-center mt-1">
                            <h4>500</h4>
                            <span>Today's New Orders</span>
                        </div>
                    </div>
                </div>

                <div className='d-flex mt-3'>
                    <div className="border p-3 today-revenue-container w-100 me-3">
                        <div className="today-revenue-count text-center mt-1">
                            <h4>82.8 %</h4>
                            <span>Conversion Rate</span>
                        </div>
                    </div>

                    <div className="border p-3 order-count-container w-100">
                        <div className="order-count text-center mt-1">
                            <h4>80.5 %</h4>
                            <span>Avg.value</span>
                        </div>
                    </div>
                </div>

                <div className='d-flex mt-3'>
                    <div className="border p-3 today-revenue-container w-100 me-3">
                        <div className="today-revenue-count text-center mt-1">
                            <h4>50 +</h4>
                            <span>Total Customers</span>
                        </div>
                    </div>

                    <div className="border p-3 order-count-container w-100">
                        <div className="order-count text-center mt-1">
                            <h4>25,000 +</h4>
                            <span>Total Orders</span>
                        </div>
                    </div>
                </div>
            </Grid>

            {/* New Products */}
            <Grid item xs={12} lg={6} className='mb-4'>
                <div className="border p-3">
                    <h6 style={{ marginBottom: "-.1rem" }}>Recent Products</h6>
                </div>
                <div className="border p-4 product-data-table">
                    <TableContainer>
                        <Table aria-label="simple table" >
                            <TableHead className='bg-light'>
                                <TableRow>
                                    <TableCell className='fw-bold'>Product</TableCell>
                                    <TableCell align='center' className='fw-bold'>Price</TableCell>
                                    <TableCell align='center' className='fw-bold'>Category</TableCell>
                                    <TableCell align='center' className='fw-bold'>Status</TableCell>
                                    <TableCell align='center' className='fw-bold'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredProduct?.reverse().slice(0, 5).map((product) => {
                                        return (
                                            <TableRow
                                                key={product.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" className='d-flex align-items-center'>
                                                    <img src={product.thumbnail} alt="" />
                                                    <div className='text-start ms-3'>
                                                        <h6 className='product-title'>{product.title}</h6>
                                                        <span className='product-id'>ID : {product.id}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <span className='product-discount'>${calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}</span>
                                                    <del className='product-price'>${product.price}</del>
                                                </TableCell>
                                                <TableCell align="center" className='product-category'>{product.category}</TableCell>
                                                <TableCell align="center">
                                                    {product.availabilityStatus === "In Stock" ?
                                                        <span className='product-stock-status product-in-Stock'>Stock</span>
                                                        :
                                                        <span className='product-stock-status product-low-stock'>Low Stock</span>
                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div className="d-flex align-items-center justify-content-center product-action">
                                                        <Link to={`/dashboard/editProduct/${product.id}`}>
                                                            <FaPencilAlt />
                                                        </Link>
                                                        <Link to={`/dashboard/productDetails/${product.id}`}>
                                                            <FaEye className='mx-2' />
                                                        </Link>
                                                        <RiDeleteBin6Line onClick={() => handleDelete(product.id)} />
                                                        <Toaster />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }


                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>

            {/* New Orders */}
            <Grid item xs={12} lg={6} className='mb-4'>
                <div className="border p-3 ms-lg-3 ms-0">
                    <h6 style={{ marginBottom: "-.1rem" }}>Recent Orders</h6>
                </div>
                <div className="border p-4 order-data-table ms-lg-3 ms-0">
                    <TableContainer>
                        <Table aria-label="simple table" >
                            <TableHead className='bg-light'>
                                <TableRow>
                                    <TableCell align='center' className='fw-bold'>Order ID</TableCell>
                                    <TableCell align='center' className='fw-bold'>User ID</TableCell>
                                    <TableCell align='center' className='fw-bold'>Total Items</TableCell>
                                    <TableCell align='center' className='fw-bold'>Status</TableCell>
                                    <TableCell align='center' className='fw-bold'>Payment Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders?.reverse().slice(0, 5).map((order) => {
                                        return (
                                            <TableRow
                                                key={order.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">
                                                    #{order.id}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <span className='product-discount'>{order.userID}</span>
                                                </TableCell>
                                                <TableCell align="center" className='product-category'>{order.products.length}</TableCell>
                                                <TableCell align="center">
                                                    {
                                                        getOrderStatus(order?.orderStatus)
                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    {
                                                        order.paymentStatus === "PENDING" ?
                                                            <span className='payment-status payment-pending'>{order.paymentStatus}</span>
                                                            :
                                                            <span className='payment-status payment-recieved'>{order.paymentStatus}</span>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>

        </Grid>
    )
}

export default Main
