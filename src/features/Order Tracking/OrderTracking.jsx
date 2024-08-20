import React, { useEffect, useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Container, Grid, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, StepContent, Button } from '@mui/material';
import "./orderTracking.css"
import { useAuth0 } from '@auth0/auth0-react';
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const OrderTracking = () => {

    // Get User
    const user = JSON.parse(localStorage.getItem("user"));

    // Get Address
    const address = JSON.parse(localStorage.getItem("User Address")) || {};

    // Get Order
    const orders = JSON.parse(localStorage.getItem("Order")) || [];
    const steps = ['Confirmed', 'Picked by courier', 'On the way', 'Delivered'].toString().toUpperCase().split(",");

    const [filterOrder, setFilterOrder] = useState(null);
    const [updateStep, setUpdateStep] = useState("");
    const [userAddress, setUserAddress] = useState({});

    // Filter Orders
    useEffect(() => {
        if (user) {
            const newOrders = orders?.filter((order) => {
                console.log(order.userID === user.userID);
                
                return order.userID === user?.userID
            });
            const sortedOrders = newOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            if (sortedOrders.length > 0) {
                const latestOrder = sortedOrders[0];
                setFilterOrder(latestOrder);
                const step = steps.indexOf(latestOrder.orderStatus.toUpperCase()) + 1;
                setUpdateStep(step);
                setUserAddress(address);
            }
        }
    }, []);

    // Clear Order Tracking 
    useEffect(() => {
        if (filterOrder?.orderStatus === "DELIVERED" || filterOrder?.orderStatus === "CANCELLED") {
            setFilterOrder(null);
        }
    }, [filterOrder]);

    return (
        <>
            {
                filterOrder ?
                    <Container sx={{ p: 10 }}>
                        <Grid container spacing={3} sx={{ mb: 5 }}>
                            <Grid item md={6} xs={12} >
                                <div className='shadow bg-white p-4'>
                                    <Typography variant="h6">Order Tracking</Typography>
                                    <Box sx={{ mt: 2 }}>
                                        {
                                            <>
                                                <Typography className='mb-2'><strong>User ID:</strong> #{user?.userID}</Typography>
                                                <Typography className='mb-2'><strong>Estimated Delivery time:</strong> One Week</Typography>
                                                <Typography className='mb-2'><strong>Emergency Contact:</strong> +92 316 7598621</Typography>
                                                <Typography className='mb-2'><strong>Status:</strong> {filterOrder.orderStatus}</Typography>
                                                <Typography className='mb-2'><strong>Tracking:</strong> #BD045903594059</Typography>
                                                <Typography className='mb-2'><strong>Payment:</strong> {filterOrder.payment}</Typography>
                                            </>
                                        }
                                    </Box>
                                </div>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <div className='shadow bg-white p-4'>
                                    <Typography variant="h6">Address Details</Typography>
                                    <Box sx={{ mt: 2 }}>
                                        {
                                            userAddress && <>
                                                <Typography className='mb-2'><strong>Customer Name:</strong> {userAddress.firstname + " " + userAddress.lastname}</Typography>
                                                <Typography className='mb-2'><strong>Customer Address:</strong> {userAddress.address}</Typography>
                                                <Typography className='mb-2'><strong>Customer Contact:</strong> {userAddress.phone}</Typography>
                                                <Typography className='mb-2'><strong>Customer Country:</strong> {userAddress.country}</Typography>
                                                <Typography className='mb-2'><strong>Customer City:</strong> {userAddress.country}</Typography>
                                                <Typography className='mb-2'><strong>Customer Zipcode:</strong> {userAddress.postcode}</Typography>
                                            </>
                                        }
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>

                        {/* Responsive Stepper Start */}
                        <div className='stepper-container d-sm-block d-none'>
                            <Box sx={{ width: '100%' }} >
                                <Stepper activeStep={updateStep} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </div>

                        <div className='stepper-container d-sm-none d-flex align-items-center justify-content-center'>
                            <Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "center" }}>
                                <Stepper activeStep={updateStep} orientation="vertical">
                                    {steps.map((label, index) => (
                                        <Step key={label}>
                                            <StepLabel
                                            >
                                                {label}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </div>
                        {/* Responsive Stepper End */}

                        <Grid container sx={{ mt: 5 }}>
                            <TableContainer className='shadow'>
                                <Table aria-label="simple table" className='bg-white'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' className='fw-bold'>Product Image</TableCell>
                                            <TableCell align='center' className='fw-bold'>Product Name</TableCell>
                                            <TableCell align='center' className='fw-bold'>Product Price</TableCell>
                                            <TableCell align='center' className='fw-bold'>Product Quantity</TableCell>
                                            <TableCell align='center' className='fw-bold'>Product Rating</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        filterOrder.products && filterOrder.products.map((order) => {
                                            return (
                                                <TableRow
                                                    key={order.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    className='order-card'
                                                >
                                                    <TableCell align='center' component="th" scope="row">
                                                        <img src={order.thumbnail} alt="" />
                                                    </TableCell>
                                                    <TableCell align='center' component="th" scope="row">
                                                        {order.title}
                                                    </TableCell>
                                                    <TableCell align='center'>Rs. {order.price}</TableCell>
                                                    <TableCell align='center'>{order.quantity}</TableCell>
                                                    <TableCell align='center'>
                                                        <FaStar style={{ color: "orange", marginTop: "-.2rem", marginRight: ".3rem" }} /> {order.rating} / 5
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Container>
                    :
                    <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                        <div>
                            <p>No Order Place Yet.</p>
                            <Link to={`/`} className='btn btn-secondary shadow'>Go Back To Shopping</Link>
                        </div>
                    </div>
            }

        </>

    );
};

export default OrderTracking;