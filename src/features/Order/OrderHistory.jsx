import React, { useEffect, useState } from 'react'
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Grid,
    CardMedia,
    Divider
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader } from "../index"
import { Link, useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import "./order.css"

function OrderHistory() {

    // Get Current Location
    const location = useLocation();
    const isProfile = location.pathname === "/profile";

    // Get Current User
    const user = JSON.parse(localStorage.getItem("user"));

    // Get All Orders
    const orders = JSON.parse(localStorage.getItem("Order")) || [];
    console.log(orders);
    

    // State Variables
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const filterOrders = () => {
        const filteredOrders = orders.filter((order) => {
            return order.userID === user?.userID && order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED"
        }).reverse();
        setUserOrders(filteredOrders);
        setLoading(false);
    }

    // Filter Orders
    useEffect(() => {
        filterOrders();
    }, [])

    // Calculate Amount
    const getAmount = (products) => {
        return products.reduce((accu, currVal) => {
            return accu + (currVal.price * currVal.quantity);
        }, 0)
    }

    // Generate Random Order Number
    const generateRandomOrderNumber = () => {
        return Math.floor(Math.random() * 10000)
    }


    return (
        <Container sx={{ p: 3, bgcolor: "#fff", my: isProfile ? 0 : 5 }} className='order-container'>
            <h4 className='heading'>
                Order History
            </h4>
            <small>
                Check the status of recent orders.
            </small>

            {
                loading && <Loader />
            }

            {userOrders.map((order, index) => (
                <>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body2" className='mb-2'><strong>Date placed:</strong> {order.date.replace("T", " ").slice(0, -14)}</Typography>
                            <Typography variant="body2" className='mb-2'><strong>Order number:</strong> #{generateRandomOrderNumber()}</Typography>
                            <Typography variant="body2" className='mb-2'><strong>Total amount:</strong> Rs. {getAmount(order.products)}</Typography>
                            <Typography variant="body2" className='mb-2'><strong>Status:</strong> {order.orderStatus}</Typography>
                        </Grid>
                    </Grid>
                    <TableContainer sx={{ mt: 3 }} className='shadow bg-white p-3'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='fw-bold' align="center">Product</TableCell>
                                    <TableCell className='fw-bold' align="center">Name</TableCell>
                                    <TableCell className='fw-bold' align="center">Price</TableCell>
                                    <TableCell className='fw-bold' align="center">Quantity</TableCell>
                                    <TableCell className='fw-bold' align="center">Ratings</TableCell>
                                    <TableCell className='fw-bold' align="center">Info</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.products.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={item.thumbnail}
                                                    alt={item.thumbnail}
                                                    sx={{ width: 50, height: 50, mr: 2 }}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">{item.title}</TableCell>
                                        <TableCell align="center">Rs. {item.price}</TableCell>
    
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        <TableCell align='center'>
                                            <FaStar style={{ color: "orange", marginTop: "-.2rem", marginRight: ".3rem" }} /> {item.rating} / 5
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`/product-detail/${item.id}`} className="btn btn-main">View Product</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>

            ))}
        </Container>
    )
}

export default OrderHistory
