import React, { useEffect, useState } from 'react'
import OrderManagement from './OrderManagement';
import { Container, Grid, Tab, Box, Breadcrumbs, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch } from 'react-redux';
import { updateOrderStatus, updatePaymentStatus } from '../../redux/orderSlices';
import { Toaster, toast } from 'react-hot-toast';
import "./css/order.css"

function Orders() {

    // // Get All Orders
    const orders = JSON.parse(localStorage.getItem("Order"));
    const dispatch = useDispatch();

    const [value, setValue] = useState('1');
    const [editMode, setEditMode] = useState({});
    const [orderStatusValue, setOrderStatusValue] = useState('');
    const [paymentStatusValue, setPaymentStatusValue] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleEditMode = (orderId) => {
        setEditMode((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    const handleOrderStatusChange = (e, orderID) => {
        toggleEditMode(orderID);
        const status = e.target.value;
        setOrderStatusValue(status);
        // Notification Msg
        toast.success("Edit Order Successfully", {
            position: "top-right",
            autoClose: 1500,
            theme: "colored"
        });
        dispatch(updateOrderStatus({ id: orderID, updatedStatus: status }));
    };

    const handlePaymentStatusChange = (e, orderID) => {
        toggleEditMode(orderID);
        const status = e.target.value;
        setPaymentStatusValue(status);
        // Notification Msg
        toast.success("Edit Order Successfully", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        dispatch(updatePaymentStatus({ id: orderID, updatedStatus: status }));
    }

    const updateOrder = (orderID) => {
        setOrderStatusValue("");
        setPaymentStatusValue("");
    };

    const filteredOrders = (status) => {
        return orders?.filter(order => order.orderStatus === status).reverse();
    };

    return (
        <>
            <Grid sx={{ mt: 5, mb: 0, px: 3 }}>
                {
                    orders?.length > 0 ? <Grid xs={12}>
                        <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
                            <h2 className='dashboard-heading mb-4'>Order Details</h2>
                            <div className="d-sm-block d-none">
                                <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
                                    <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
                                    <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
                                    <Typography className='breadcrumb-item-active' color="text.primary">Order Details</Typography>
                                </Breadcrumbs>
                            </div>
                        </Grid>
                        <Box sx={{ typography: 'body1', border: "1px solid #ddd", padding: "1rem" }}>
                            <TabContext value={value}>
                                <Box>
                                    <TabList onChange={handleChange} textColor={'primary'} indicatorColor="primary">
                                        <Tab label="All Orders" value="1" />
                                        <Tab label="Confirmed" value="2" />
                                        <Tab label="Pending" value="3" />
                                        <Tab label="Cancelled" value="4" />
                                        <Tab label="Delivered" value="5" />
                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <OrderManagement
                                        orders={orders?.reverse()}
                                        editMode={editMode}
                                        handleStatusChange={handleOrderStatusChange}
                                        handlePaymentStatusChange={handlePaymentStatusChange}
                                        updateOrder={updateOrder}
                                        toggleEditMode={toggleEditMode}
                                        orderStatusValue={orderStatusValue}
                                        paymentStatusValue={paymentStatusValue}
                                    />
                                </TabPanel>

                                <TabPanel value="2">
                                    <OrderManagement
                                        orders={filteredOrders('CONFIRMED')}
                                        editMode={editMode}
                                        handleStatusChange={handleOrderStatusChange}
                                        handlePaymentStatusChange={handlePaymentStatusChange}
                                        updateOrder={updateOrder}
                                        toggleEditMode={toggleEditMode}
                                        orderStatusValue={orderStatusValue}
                                        paymentStatusValue={paymentStatusValue}
                                    />
                                </TabPanel>

                                <TabPanel value="3">
                                    <OrderManagement
                                        orders={filteredOrders('PENDING')}
                                        editMode={editMode}
                                        handleStatusChange={handleOrderStatusChange}
                                        handlePaymentStatusChange={handlePaymentStatusChange}
                                        updateOrder={updateOrder}
                                        toggleEditMode={toggleEditMode}
                                        orderStatusValue={orderStatusValue}
                                        paymentStatusValue={paymentStatusValue}
                                    />
                                </TabPanel>

                                <TabPanel value="4">
                                    <OrderManagement
                                        orders={filteredOrders('CANCELLED')}
                                        editMode={editMode}
                                        handleStatusChange={handleOrderStatusChange}
                                        handlePaymentStatusChange={handlePaymentStatusChange}
                                        updateOrder={updateOrder}
                                        toggleEditMode={toggleEditMode}
                                        orderStatusValue={orderStatusValue}
                                        paymentStatusValue={paymentStatusValue}
                                    />
                                </TabPanel>

                                <TabPanel value="5">
                                    <OrderManagement
                                        orders={filteredOrders('DELIVERED')}
                                        editMode={editMode}
                                        handleStatusChange={handleOrderStatusChange}
                                        handlePaymentStatusChange={handlePaymentStatusChange}
                                        updateOrder={updateOrder}
                                        toggleEditMode={toggleEditMode}
                                        orderStatusValue={orderStatusValue}
                                        paymentStatusValue={paymentStatusValue}
                                    />
                                </TabPanel>

                                <Toaster />

                            </TabContext>
                        </Box>
                    </Grid> : <p>No Orders Found Yet.</p>
                }

            </Grid>
        </>
    )
}

export default Orders
