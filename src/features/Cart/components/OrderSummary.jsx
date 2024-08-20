import React from 'react'
import { Box, Paper, Typography, Divider, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function OrderSummary({ subtotal, shipping, tax }) {

  const total = subtotal + shipping + tax;

  return (
    <>
      <Grid sx={{ p: 2, mt: 3, mb: 2 }} className='bg-white'>
        <Typography variant="h6" gutterBottom>Order summary</Typography>
        <Divider />
        <Box mt={3} className="d-flex align-items-center justify-content-between">
          <Typography variant="body2">Subtotal</Typography>
          <span>${subtotal.toFixed(2)}</span>
        </Box>
        <Box mt={3} className="d-flex align-items-center justify-content-between">
          <Typography variant="body2">Shipping estimate</Typography>
          <span>${shipping.toFixed(2)}</span>
        </Box>
        <Box mt={3} mb={2} className="d-flex align-items-center justify-content-between">
          <Typography variant="body2">Tax estimate</Typography>
          <span>${tax.toFixed(2)}</span>
        </Box>
        <Divider />
        <Box mt={2} mb={3} className="d-flex align-items-center justify-content-between">
          <Typography variant="body1">Order total</Typography>
          <span>${total.toFixed(2)}</span>
        </Box>
        <Link to={`/checkout`}>
          <button className='btn btn-main w-100'>Checkout</button>
        </Link>
      </Grid>
    </>
  )
}

export default OrderSummary
