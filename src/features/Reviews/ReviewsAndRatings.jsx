import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Rating, Button, Chip, Avatar, IconButton } from '@mui/material';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { IoIosStar } from "react-icons/io";
import './reviews.css';

function ReviewsAndRatings({ product }) {

    const [productReviews, setProductReviews] = useState([]);

    // Months 
    const getMonthsPassed = (orderDate) => {
        const now = new Date();
        const order = new Date(orderDate);

        const yearsDiff = now.getFullYear() - order.getFullYear();
        const monthsDiff = now.getMonth() - order.getMonth();

        return yearsDiff * 12 + monthsDiff;
    };

    // Filter Reviews
    const handleFilter = (filterVal) => {
        const filterReviews = product?.reviews.filter((review) => {
            return Math.floor(review.rating) === parseInt(filterVal)
        });
        setProductReviews(filterReviews);
    }

    // Set Reviews
    useEffect(() => {
        setProductReviews(product.reviews);
    }, [])

    return (
        <>
            <Box className="ratings-reviews">
                <Box className="ratings-summary">
                    <h5 className='text-secondary'>Overall Ratings</h5>
                    <div className='ratings-summary-details'>
                        <h2>{product.rating}</h2>
                        <Rating value={product.rating} readOnly />
                    </div>
                </Box>
                <Box className="filter-buttons ">
                    {['5', '4', '3', '2', '1'].map((filter, index) => (
                        <>
                            <button onClick={() => handleFilter(filter)} className='btn d-flex align-items-center' style={{ padding: ".5rem .9rem", backgroundColor: "#eff0f5" }} key={index}>
                                <IoIosStar style={{ color: "orange" }} />
                                <span className='ms-2' style={{ marginBottom: "-.2rem" }}>{filter}</span>
                            </button>
                        </>
                    ))}
                </Box>
                <Box className="reviews-tags mt-4">
                    {['Nice Quality(47)', 'Good Price(21)', 'Good Wallet(13)', 'Reasonable Product(5)', 'Good Leather(3)'].map((tag, index) => (
                        <Chip label={tag} key={index} />
                    ))}
                </Box>
                <Box className="reviews-list">
                    {productReviews.length ? productReviews.map((review, index) => (
                        <Box key={index} className="review">
                            <Box className="review-header">
                                <Avatar>{review.reviewerName[0]}</Avatar>
                                <Box>
                                    <Typography variant="body1">{review.reviewerName}</Typography>
                                    <Rating value={review.rating} readOnly />
                                </Box>
                            </Box>
                            <Typography variant="body2">{review.comment}</Typography>
                            <Box className="review-footer">
                                <Typography variant="body2" color={"#666"}>{review.reviewerEmail}</Typography>
                                <Typography variant="body2">{getMonthsPassed(review.date)} Months ago</Typography>
                            </Box>
                        </Box>
                    )
                    )
                        :
                        <p>No Reviews</p>
                    }
                </Box>
            </Box>
        </>
    )
}

export default ReviewsAndRatings
