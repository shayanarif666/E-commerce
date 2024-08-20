import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, MenuItem, InputLabel, FormControl, Select, Box } from "@mui/material"
import { FaPencilAlt } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import OrderStatus from './OrderStatus';
import PaymentStatus from './PaymentStatus';

function OrderManagement({ orders, editMode, handleStatusChange, handlePaymentStatusChange, updateOrder, toggleEditMode, orderStatusValue, paymentStatusValue }) {
    return (
        <>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead className='bg-light'>
                        <TableRow>
                            <TableCell className='fw-bold'>ID</TableCell>
                            <TableCell className='fw-bold'>User ID</TableCell>
                            <TableCell className='fw-bold' align='center'>Order Status</TableCell>
                            <TableCell className='fw-bold' align='center'>Total Items</TableCell>
                            <TableCell className='fw-bold' align='center'>Payment</TableCell>
                            <TableCell className='fw-bold' align='center'>Payment Status</TableCell>
                            <TableCell className='fw-bold'>Date</TableCell>
                            <TableCell className='fw-bold' align='center'>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">#{order.id}</TableCell>
                                <TableCell>{order.userID}</TableCell>
                                <TableCell align='center'>
                                    {!editMode[order.id] ? (
                                        <OrderStatus status={order.orderStatus} />
                                    ) : (
                                        <Box sx={{ minWidth: 60 }}>
                                            <FormControl fullWidth>
                                                <InputLabel>Update Status</InputLabel>
                                                <Select value={orderStatusValue} label="Status" onChange={(e) => handleStatusChange(e, order.id)}>
                                                    <MenuItem value="PENDING">PENDING</MenuItem>
                                                    <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                                                    <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                                                    <MenuItem value="PICKED BY COURIER">PICKED BY COURIER</MenuItem>
                                                    <MenuItem value="ON THE WAY">ON THE WAY</MenuItem>
                                                    <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell align='center'>{order.products.length}</TableCell>
                                <TableCell align='center'>{order.payment}</TableCell>
                                <TableCell align='center'>
                                    {!editMode[order.id] ? (
                                        <PaymentStatus status={order.paymentStatus} />
                                    ) : (
                                        <Box sx={{ minWidth: 60 }}>
                                            <FormControl fullWidth>
                                                <InputLabel>Update Status</InputLabel>
                                                <Select value={paymentStatusValue} label="Status" onChange={(e) => handlePaymentStatusChange(e, order.id)}>
                                                    <MenuItem value="PENDING">PENDING</MenuItem>
                                                    <MenuItem value="RECIEVED">RECIEVED</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell align='center'>
                                    {editMode[order.id] ? (
                                        <CiSaveDown2 onClick={() => updateOrder(order.id)} style={{ cursor: "pointer", fontSize: "1.5rem", fontWeight: 600 }} />
                                    ) : (
                                        <FaPencilAlt onClick={() => toggleEditMode(order.id)} style={{ cursor: "pointer" }} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default OrderManagement
