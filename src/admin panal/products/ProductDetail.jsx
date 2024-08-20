import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Divider, Grid, Rating, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import { fetchingSingleProduct } from '../../jsonData/apiProducts';
import { BackDropLoader } from "../../features/index";
import { FaCheck, FaShippingFast } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { AiFillCustomerService } from "react-icons/ai";

function ProductDetail() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [currImg, setCurrImg] = useState(0);
    const [hexCode, setHexCode] = useState("");

    // Get ID
    const { id } = useParams();

    // Get Product Data
    const getSingleProduct = async () => {
        setLoading(true);
        try {
            const productData = await fetchingSingleProduct(id);
            setProduct(productData);
            setLoading(false);
            setError(false)
        } catch (error) {
            setError("Error in Product Detail", error)
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, [currImg])

    // Handle Current Image
    const handleCurrentImage = (index) => {
        setCurrImg(index);
    }

    // Calculate Discount 
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };

    // Generate Random Color
    const generateRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (let index = 0; index < 6; index++) {
            color += letters[Math.floor(Math.random() * 16)];
            setHexCode(color)
        }
    }

    useEffect(() => {
        generateRandomColor()
    }, [])

    return (
        <Grid sx={{ mt: 5, mb: 0, px: 3 }}>
            <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
                <h2 className='dashboard-heading mb-4'>Product Detail</h2>
                <div className="d-sm-block d-none">
                    <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
                        <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
                        <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
                        <Typography className='breadcrumb-item-active' color="text.primary">Product Detail</Typography>
                    </Breadcrumbs>
                </div>
            </Grid>

            {loading && <BackDropLoader />}
            {error && <p className='text-danger'>{error}</p>}

            {
                product && <>
                    <div className="row">

                        <div className="col-md-6 col-xl-4 mb-4">
                            <div className="product-image-container bg-white p-3 text-center" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", width: "100%", borderRadius: "10px" }}>
                                <img src={product.images[currImg]} style={{ backgroundColor: "#eef2f7", width: "100%", height: "450px", borderRadius: "10px" }} alt="" />
                                <div className="product-images-showcase">
                                    {
                                        product.images.map((image, ind) => {
                                            return <img src={image} onClick={() => handleCurrentImage(ind)} alt='' className='mt-3' style={{ cursor: "pointer", backgroundColor: "#eef2f7", margin: "0 10px", width: "20%", height: "80px" }} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-xl-5 mb-4" >
                            <div className="product-information p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                <h5>{product.title}</h5>
                                <div className="product-rating d-flex align-items-center mt-3">
                                    <Rating name="read-only" value={product.rating} readOnly />
                                    <span className='ms-2 me-1'>{product.rating}</span>
                                    <small>({product.reviews.length} reviews)</small>
                                </div>
                                <div className="product-price mt-3 d-flex align-items-center">
                                    <h4>${calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}</h4>
                                    <del className='ms-2' style={{ fontSize: "1rem" }}>${product.price}</del>
                                    <small className='d-inline-block ms-2 text-danger' style={{ fontSize: ".8rem" }}>({Math.floor(product.discountPercentage)}%off)</small>
                                </div>
                                <div className="product-category d-flex align-items-center mt-3">
                                    <h6 style={{ fontSize: ".8rem" }}>Category : </h6>
                                    <span className='ms-2' style={{ marginTop: "-.5rem", fontSize: ".8rem" }}>{product.category}</span>
                                </div>
                                <div className="product-brand d-flex align-items-center mt-1">
                                    <h6 style={{ fontSize: ".8rem" }}>Brand : </h6>
                                    <span className='ms-2' style={{ marginTop: "-.5rem", fontSize: ".8rem" }}>{product.brand}</span>
                                </div>
                                <div className="product-stock d-flex align-items-center mt-1">
                                    <h6 style={{ fontSize: ".8rem" }}>Stock : </h6>
                                    <span className='ms-2' style={{ marginTop: "-.5rem", fontSize: ".8rem" }}>{product.stock} Pieces Remaining</span>
                                </div>
                                <div className="product-availibity mt-2 d-flex align-items-center">
                                    <h6 style={{ fontSize: ".8rem" }}>Status : </h6>
                                    <span className='product-stock-status product-in-Stock p-1 ms-2' style={{ marginTop: "-.5rem", fontSize: ".8rem" }}>{product.availabilityStatus}</span>
                                </div>

                                <Divider sx={{ marginTop: "1rem", backgroundColor: "#ccc" }} />

                                <div className="product-services mt-3">
                                    <div className="stock-available d-flex align-items-center mb-2">
                                        <FaCheck style={{ color: "86c763", fontSize: ".9rem" }} />
                                        <span className='ms-2' style={{ fontSize: ".9rem" }}>In Stock</span>
                                    </div>
                                    <div className="stock-available d-flex align-items-center mb-2">
                                        <FaCheck style={{ color: "86c763", fontSize: ".9rem" }} />
                                        <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.warrantyInformation} Available</span>
                                    </div>
                                    <div className="stock-available d-flex align-items-center mb-2">
                                        <FaCheck style={{ color: "86c763", fontSize: ".9rem" }} />
                                        <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.returnPolicy}</span>
                                    </div>
                                </div>

                                <div className="product-description mt-3">
                                    <h6 style={{ fontSize: ".9rem" }}>Description : </h6>
                                    <p style={{ fontSize: ".8rem" }}>{product.description}</p>
                                </div>
                                <div className="product-sku mt-3 d-flex align-items-center">
                                    <h6 style={{ fontSize: ".9rem" }}>SKU : </h6>
                                    <span className='ms-2' style={{ marginTop: "-.5rem", fontSize: ".8rem" }}>{product.sku}</span>
                                </div>

                            </div>
                        </div>

                        <div className="col-12 col-xl-3 mb-4">
                            <div className="row g-3 product-services">
                                <div className="col-md-6 col-xl-12">
                                    <div className="free-shipping d-flex align-items-center p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                        <FaShippingFast className='me-4 p-2' style={{ backgroundColor: "#eef2f7", borderRadius: "15px", color: "orangered", fontSize: "2.5rem" }} />
                                        <div className="shipping-info">
                                            <h6 style={{ fontSize: ".9rem", fontWeight: "500" }}>Free Sipping For All Orders Over 300$</h6>
                                            <span className='d-block' style={{ fontSize: ".8rem", marginTop: "-.2rem" }}>Only in this week</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-12">
                                    <div className="discount d-flex align-items-center p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                        <MdOutlineDiscount className='me-4 p-2' style={{ backgroundColor: "#eef2f7", borderRadius: "15px", color: "orangered", fontSize: "2.5rem" }} />
                                        <div className="shipping-info">
                                            <h6 style={{ fontSize: ".9rem", fontWeight: "500" }}>Special discounts for customers</h6>
                                            <span className='d-block' style={{ fontSize: ".8rem", marginTop: "-.2rem" }}>Coupons up to $ 100</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-12">
                                    <div className="gift-wrap d-flex align-items-center p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                        <IoGiftOutline className='me-4 p-2' style={{ backgroundColor: "#eef2f7", borderRadius: "15px", color: "orangered", fontSize: "2.5rem" }} />
                                        <div className="shipping-info">
                                            <h6 style={{ fontSize: ".9rem", fontWeight: "500" }}>Free gift wrapping</h6>
                                            <span className='d-block' style={{ fontSize: ".8rem", marginTop: "-.2rem" }}>With 100 letters custom note</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-12 customer-service">
                                    <div className="customer-service d-flex align-items-center p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                        <AiFillCustomerService className='me-4 p-2' style={{ backgroundColor: "#eef2f7", borderRadius: "15px", color: "orangered", fontSize: "2.5rem" }} />
                                        <div className="shipping-info">
                                            <h6 style={{ fontSize: ".9rem", fontWeight: "500" }}>Expert Customer Service</h6>
                                            <span className='d-block' style={{ fontSize: ".8rem", marginTop: "-.2rem" }}>8:00 - 20:00, 7 days/wee</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="item-detail p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                <h6>Item Detail</h6>

                                <Divider sx={{ marginTop: "1rem", backgroundColor: "#ccc" }} />

                                <div className="d-flex align-items-center mt-4">
                                    <span style={{ fontSize: ".9rem" }}>Product Dimension :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span style={{ fontSize: ".9rem" }}>Weight :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.weight} Kilogram</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span style={{ fontSize: ".9rem" }}>Barcode :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.meta.barcode}</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span style={{ fontSize: ".9rem" }}>Created Product :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.meta.createdAt.replace("T", " ").slice(0, 10)}</span>
                                </div>

                                <div className="d-flex align-items-center mt-4">
                                    <span style={{ fontSize: ".9rem" }}>Minimum Item Quantity :</span>
                                    <span className='ms-2' style={{ fontSize: ".9rem" }}>{product.minimumOrderQuantity} Pieces</span>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="reviews p-4" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius: "10px" }}>
                                <h6>Top Reviews From World</h6>

                                <Divider sx={{ marginTop: "1rem", backgroundColor: "#ccc" }} />

                                {
                                    product.reviews.map((review) => {
                                        return (
                                            <div className="people-review mt-4">
                                                <div className="reviewer-name-container d-flex align-items-center">
                                                    <div className="me-3 img d-flex align-items-center justify-content-center" style={{ width: "50px", color: "#fff", fontSize: "1.7rem", height: "50px", backgroundColor: `${hexCode}`, borderRadius: "50%" }}>{review.reviewerName[0]}</div>
                                                    <div className="reviewer-name">
                                                        <h6 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 600 }}>{review.reviewerName}</h6>
                                                    </div>
                                                </div>
                                                <div className="reviewer-rating mt-3 d-flex align-items-center">
                                                    <Rating name="read-only" value={review.rating} readOnly />
                                                    <span className='ms-2'>{review.comment}</span>
                                                </div>
                                                <div className="reviewer-rating mt-3 d-flex align-items-center">
                                                    <span>Reviewed On : {review.date.replace("T", " ").slice(0, 10)}</span>
                                                </div>
                                                <div className="reviewer-rating mt-3 d-flex align-items-center">
                                                    <span>Email : {review.reviewerEmail}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>

                    </div>
                </>
            }



        </Grid>
    )
}

export default ProductDetail
