import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Button, IconButton, Select, MenuItem } from '@mui/material';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity } from '../../../redux/cartSlices';
import "./css/cart.css"

function Cart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = JSON.parse(localStorage.getItem("Cart Data")) || [];

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const onChangeQuantity = (e, id) => {
        dispatch(changeQuantity({ quantity: parseInt(e.target.value), id: parseInt(id) }))
        navigate("/cart");
    }

    return (
        <>
            {
                cart.length > 0 ? <Container>
                    <h4 className='heading mt-5'>Shopping Cart</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            {cart.map(product => (
                                <CartItems key={product.id} item={product} quantity={product.quantity} onQuantity={onChangeQuantity}></CartItems>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <OrderSummary subtotal={subtotal} shipping={5.00} tax={8.32} />
                        </Grid>
                    </Grid>
                </Container> : <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                    <div>
                        <p>There is no items in your cart right now.</p>
                        <Link to={`/`} className='btn btn-secondary shadow'>Go Back To Shopping</Link>
                    </div>
                </div>
            }

        </>
    )
}

export default Cart
