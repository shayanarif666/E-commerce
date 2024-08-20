import React, { useEffect, useState } from 'react'
import { Container, TableContainer, TableHead, TableRow, TableCell, Table, TableBody } from '@mui/material';
import Rating from '@mui/material/Rating';
import "./wishlist.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlices';
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromWishlist } from '../../redux/wishlistSlices';
import { Link, useNavigate } from 'react-router-dom';
import {toast, Toaster} from "react-hot-toast";

function Wishlist() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get Wishlist Data From Local Storage
  const getProductsFromWishlist = useSelector((state) => state.wishlist.value) || [];

  // Add To Cart / Remove From Wishlist
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    // Notification Msg
    toast.success("Add Product In Wishlist Successfully", {
      position: "bottom-right",
      autoClose: 1200,
      theme: "colored"
    });
    setTimeout(() => {
      navigate("/cart");
    }, 1800);
  }

  const handleRemoveFromWishlist = (id) => {
    // Notification Msg
    toast.success("Remove Product In Wishlist Successfully", {
      position: "bottom-right",
      autoClose: 1200,
      theme: "colored"
    });
    setTimeout(() => {
      dispatch(removeFromWishlist(id));
    }, 1800);
  }

  return (
    <>
      {
        getProductsFromWishlist.length > 0 ?
          <Container sx={{ py: 10 }}>
            <h4 className='heading mb-3'>
              My Wishlist
            </h4>
            <TableContainer className='border p-3 wishlist-container'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell style={{ fontWeight: 600 }}>Product Name</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>Product Price</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>Product Stock</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                    getProductsFromWishlist.map((product) => {
                      return (
                        <TableRow
                          key={product.id}
                        >
                          <TableCell><RiDeleteBin6Line onClick={() => handleRemoveFromWishlist(product.id)} className='delete-button' /></TableCell>
                          <TableCell component="th" scope="row">
                            {product.title}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <button onClick={() => handleAddToCart(product)} className='btn btn-main'>Add To Cart</button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>

                <Toaster />

              </Table>
            </TableContainer>
          </Container>

          :

          <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
            <div>
              <p>Your Wishlist is empty.</p>
              <Link to={`/`} className='btn btn-secondary shadow'>Go Back To Shopping</Link>
            </div>
          </div>
      }
    </>
  )
}

export default Wishlist
