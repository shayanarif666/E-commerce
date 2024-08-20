import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../../../redux/cartSlices';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import "./css/cart.css"

function CartItems({ item, quantity, onQuantity }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveCart = (id) => {
    // Notification Msg
    toast.success("Delete Product From Cart Successfully", {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored"
    });
    dispatch(removeFromCart(id));
    setTimeout(() => {
      navigate("/cart");
    }, 2200);
  }

  return (
    <>
      <Grid container sx={{ p: 2, mt: 3, mb: 2 }} className='cart-item bg-white'>
        <Grid item xs={3} className='me-4'>
          <img src={item.thumbnail} alt={item.image} style={{ width: '100%', height: '150px' }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subtitle1"><strong>{item.title}</strong></Typography>
          <Typography className="my-2" variant="body1">{item.description}</Typography>
          <Typography variant="body1">${item.price}</Typography>

          <Box mt={1}>
            {item.inStock ? (
              <Typography variant="body2" color="success.main">In stock</Typography>
            ) : (
              <Typography variant="body2" color="error.main">{item.shippingInformation}</Typography>
            )}
          </Box>
          <Box className="d-sm-flex align-items-sm-center">
            <select className='form-select mt-2' style={{ width: '70px', borderRadius: 0 }} defaultValue={quantity} onChange={(e) => onQuantity(e, item.id)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className='btn btn-danger shadow ms-sm-2 mt-2' onClick={() => handleRemoveCart(item.id)}>Remove From Cart</button>
          </Box>
        </Grid>
      </Grid>

      <Toaster />
    </>
  )
}

export default CartItems
