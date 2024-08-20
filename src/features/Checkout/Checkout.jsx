import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, TextField, Box, Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Divider, IconButton } from '@mui/material';
import { useForm } from "react-hook-form"
import { MdErrorOutline } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { placeOrder } from '../../redux/orderSlices';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function Checkout() {

    // user Data
    const user = JSON.parse(localStorage.getItem("user"));

    // unique
    const uniqueID = Date.now();

    // Get Data From Cart
    const cart = JSON.parse(localStorage.getItem("Cart Data")) || [];
    const orders = JSON.parse(localStorage.getItem("Order")) || [];
    const userAddress = JSON.parse(localStorage.getItem("User Address")) || {};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // State Variable
    const [address, setAddress] = useState(null);
    const [paymentType, setPaymentType] = useState("cash");

    // Save Address 
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const newData = { ...data, id: Math.floor(Math.random() * 100), userID: user.sub }
        setAddress(newData);
        // Notification Msg
        toast.success("Successfully Add Address", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
    }

    // Storing Address in Session Storage / update status
    useEffect(() => {
        localStorage.setItem('User Address', JSON.stringify(address));
    }, [address]);

    // Handle Payment Type
    const handlePaymentType = (e) => {
        const paymentMethod = e.target.value;
        setPaymentType(paymentMethod);
    }

    // Sort Orders By Date
    const getLastOrderUser = () => {
        // Sort orders by date in descending order
        const sortedOrders = orders?.sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedOrders;
    };

    // Order Data Placed 
    const orderDataPlaced = () => {
        if (address) {
            const orderData = {
                id: Math.floor(Math.random() * 1000000),
                userID: user?.userID,
                date: new Date().toISOString(),
                products: cart,
                payment: paymentType,
                paymentStatus: "PENDING",
                orderStatus: "PENDING"
            };
            // Notification Msg
            toast.success("Order Place Successfully", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            setTimeout(() => {
                dispatch(placeOrder(orderData));
                navigate(`/order-tracking/${uniqueID}`)
            }, 2500);
        }
        else {
            // Notification Msg
            toast.error("Please Fill Up Address Details", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
        }
    }

    // Handle Place Order 
    const handlePlaceOrder = () => {
        const updateOrders = getLastOrderUser()
        const isOrderFound = updateOrders?.filter((order) => {
            return order.userID === user?.userID;
        });
        if (orders.length > 0) {
            if (isOrderFound[0]?.orderStatus === "DELIVERED" || isOrderFound[0]?.orderStatus === "CANCELLED") {
                orderDataPlaced();
            } else {
                // Notification Msg
                toast.error("The old order must be delivered before placing a new order", {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "colored"
                });
            }
        }
        else orderDataPlaced();
    }

    return (
        <>
            <Container sx={{ py: 4 }}>
                <h4 className='heading'>Checkout</h4>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={8}>
                        <div className='bg-white p-4'>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h6" gutterBottom>Contact information</Typography>

                                {/* Error Handle */}
                                {errors.email && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Email is required</small>}
                                <TextField {...register("email", {
                                    required: true, validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                    }
                                })} sx={{ mb: 2 }} fullWidth label="Email address" margin="normal" />

                                <Typography variant="h6" gutterBottom>Shipping information</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/* Error Handle */}
                                        {errors.firstname && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />First name is required</small>}
                                        <TextField {...register("firstname", { required: true })} fullWidth label="First name" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Error Handle */}
                                        {errors.lastname && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Last name is required</small>}
                                        <TextField {...register("lastname", { required: true })} fullWidth label="Last name" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Error Handle */}
                                        {errors.address && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Address is required</small>}
                                        <TextField {...register("address", { required: true })} fullWidth label="Address" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Error Handle */}
                                        {errors.appartment && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Appartment is required</small>}
                                        <TextField {...register("appartment", { required: true })} fullWidth label="Apartment, suite, etc." margin="normal" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Error Handle */}
                                        {errors.city && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />City is required</small>}
                                        <TextField {...register("city", { required: true })} fullWidth label="City" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Error Handle */}
                                        {errors.country && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Country is required</small>}
                                        <TextField {...register("country", { required: true })} fullWidth label="Country" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Error Handle */}
                                        {errors.state && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />State is required</small>}
                                        <TextField {...register("state", { required: true })} fullWidth label="State / Province" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Error Handle */}
                                        {errors.postcode && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Post Code is required</small>}
                                        <TextField {...register("postcode", { required: true })} fullWidth label="Postal code" margin="normal" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Error Handle */}
                                        {errors.phone && <small className='text-danger'><MdErrorOutline className='me-1' style={{ marginBottom: ".2rem" }} />Phone is required</small>}
                                        <TextField {...register("phone", { required: true, maxLength: 11 || "Phone must be valid" })} fullWidth label="Phone" margin="normal" />
                                    </Grid>

                                    <button className='btn btn-main shadow mb-4 mt-2 ms-auto'>Add Address</button>
                                </Grid>
                            </form>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h6 className='mb-3 fw-bold'>Payment Method</h6>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="cash"
                                            name="radio-buttons-group"
                                            onChange={handlePaymentType}
                                        >
                                            <FormControlLabel value="cash" control={<Radio />} label="Cash On Delivery" />
                                            <FormControlLabel value="card" control={<Radio />} label="Pay With Card" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className='bg-white p-4'>
                            <Typography variant="h6" gutterBottom>Order summary</Typography>

                            {
                                cart.map((product) => (
                                    <>
                                        <Box display="flex" justifyContent="space-between" mb={2}>
                                            <Typography variant="body2">{product.title}</Typography>
                                            <Typography variant="body2">${product.price}</Typography>
                                            <Typography variant="body2">Qty : {product.quantity}</Typography>
                                        </Box>
                                    </>
                                ))
                            }
                            <Divider />
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Subtotal</Typography>
                                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Shipping</Typography>
                                <Typography variant="body2">$5.00</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Taxes</Typography>
                                <Typography variant="body2">$5.52</Typography>
                            </Box>
                            <Divider />
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Typography variant="body2">Total</Typography>
                                <Typography variant="body2">${(subtotal + 5.52 + 5.00).toFixed(2)}</Typography>
                            </Box>

                            {
                                paymentType === "cash" ?
                                    <button className='btn btn-secondary shadow w-100' onClick={handlePlaceOrder}>Place Order</button>
                                    :
                                    <button className='btn btn-secondary shadow w-100'>Pay With Stripe</button>
                            }
                            <Toaster />
                        </div>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}

export default Checkout
