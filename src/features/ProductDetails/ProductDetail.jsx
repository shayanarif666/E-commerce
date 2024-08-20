import React, { useEffect, useState } from 'react';
import { Container, Grid, CardMedia, Divider, Breadcrumbs, Link, Typography } from '@mui/material';
import { fetchingSingleProduct, fetchingProductsByCategories } from '../../jsonData/apiProducts';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, changeQuantity, removeFromCart } from '../../redux/cartSlices'
import ProductDetailLoader from '../Skeleton Loader/ProductDetailLoader';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlices';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiCodesandbox } from "react-icons/fi";
import { PiCashRegisterLight } from "react-icons/pi";
import { RiExchange2Line } from "react-icons/ri";
import { MdOutlineNotInterested } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import ReviewsAndRatings from '../Reviews/ReviewsAndRatings';
import ProductCard from '../Product Listing/components/ProductCard';
import "./productDetail.css"
import { useAuth0 } from '@auth0/auth0-react';
import { Toaster, toast } from 'react-hot-toast';

function ProductDetail() {

    // Get Login Credentials
    const user = JSON.parse(localStorage.getItem("user"));

    // Get Data from Store
    const cart = JSON.parse(localStorage.getItem("Cart Data")) || [];
    const wishlist = useSelector((state) => state.wishlist.value);

    const dispatch = useDispatch();

    // State Variables For Products
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [productsByCategories, setProductsByCategories] = useState([]);
    const [isCartProduct, setIsCartProduct] = useState(false);
    const [selectedImage, setSelectedImage] = useState(""); // bug
    const [quantity, setQuantity] = useState(1);
    const [isWishlistProduct, setIsWishlistProduct] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    // Fetching Product Data
    const fetchingSingleData = async () => {
        try {
            const data = await fetchingSingleProduct(id);
            console.log(data);
            setProduct({ ...data, quantity: 1 });
            setSelectedImage(data.thumbnail);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching single product:", error);
            setLoading(false);
        }
    };


    // Fetching Related Categories Products
    const fetchingProductsbyCategoriesData = async (category) => {
        try {
            const getProductsByCategories = await fetchingProductsByCategories(category, id);
            setProductsByCategories(getProductsByCategories);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };


    useEffect(() => {
        fetchingSingleData();
    }, [id]);

    useEffect(() => {
        product && product.category ? fetchingProductsbyCategoriesData(product.category) : "";
    }, [product, id]);

    // Image Changing Each Click
    const handleImage = (id) => {
        setSelectedImage(product.images[id]);
    }

    // Changing Quantity of Product

    const handleChange = (e) => {
        setQuantity(e.target.value);
        dispatch(changeQuantity({ quantity: quantity, id: parseInt(id) }));
    };

    // Add To Cart / Remove From Cart Functionality
    const handleAddToCart = (product) => {
        // Notification Msg
        toast.success("Add Product In Cart Successfully", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        dispatch(addToCart({ ...product, quantity }));
        setTimeout(() => {
            navigate("/cart")
        }, 2500);
    }

    const handleRemoveFromCart = (id) => {
        // Notification Msg
        toast.success("Delete Product From Cart Successfully", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        dispatch(removeFromCart(id));
    }

    // Add To Wishlist / Remove From Wishlist Functionality
    const handleWishlist = (product) => {
        // Notification Msg
        toast.success("Add Product In Wishlist Successfully", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        dispatch(addToWishlist(product));
    }
    const removeWishlist = (id) => {
        // Notification Msg
        toast.success("Delete Product From Wishlist Successfully", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        dispatch(removeFromWishlist(id));
    }

    useEffect(() => {
        const isCartFound = cart.some((product) => product.id == id);
        const isProductInWishlist = wishlist.some((prod) => prod.id === parseInt(id));
        setIsCartProduct(isCartFound);
        setIsWishlistProduct(isProductInWishlist);
    }, [cart, wishlist])

    // Calculate Discount 
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };

    return (
        <>
            {loading && <ProductDetailLoader />}

            <section style={{ marginTop: "8rem" }}>

                <div className="container mx-auto">
                    <Breadcrumbs separator={<MdNavigateNext  />}
                        aria-label="breadcrumb">
                        <Typography style={{ fontSize: ".8rem" }} color="#6cbbd6">Home</Typography>
                        <Typography style={{ fontSize: ".8rem" }} color="#6cbbd6">{product && product.category[0].toUpperCase() + product.category.slice(1)}</Typography>
                        <Typography style={{ fontSize: ".8rem" }} color="#666">{product && product.title}</Typography>
                    </Breadcrumbs>
                </div>

                <div className="container mt-3 mx-auto">
                    {product &&
                        <>
                            <Grid container className='shadow product-detail-container p-4' style={{ backgroundColor: "#fff" }}>

                                <Grid item xs={12} md={6} lg={4} sx={{ pr: 3 }}>
                                    <CardMedia
                                        component="img"
                                        image={selectedImage}
                                        alt="Product Image"
                                        sx={{ mb: 2, height: '350px' }}
                                    />

                                    <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                    <Grid container spacing={2} sx={{ pt: 2 }}>
                                        {product?.images.map((image, index) => (
                                            <Grid item key={image}>
                                                <CardMedia
                                                    component="img"
                                                    image={image}
                                                    className='shadow'
                                                    alt="Product Thumbnail"
                                                    sx={{ width: '60px', height: '60px', cursor: "pointer" }}
                                                    onClick={() => handleImage(index)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4} sx={{ py: 5 }}>
                                    <div className="product-title">
                                        <h4>{product.title}</h4>
                                    </div>
                                    <div className="product-rating mb-2">
                                        <div className='d-flex align-items-center'>
                                            <Rating className='d-sm-flex d-none' name="read-only" value={product.rating} readOnly />
                                            <small>{product.rating} Ratings | {product.reviews.length} Peoples Reviews</small>
                                        </div>
                                        <div className="product-store ms-3">
                                            {
                                                isWishlistProduct ? <GoHeartFill onClick={() => removeWishlist(product.id)} /> : <GoHeart onClick={() => handleWishlist(product)} />
                                            }
                                        </div>
                                    </div>
                                    <div className="product-brand mb-1">
                                        <span className='brand-name'>Brand :</span>
                                        <span className='brand-value'>{product.brand ? product.brand : "No Brand"}</span>
                                    </div>
                                    <div className="product-brand mb-2">
                                        <span className='brand-name'>Category :</span>
                                        <span className='brand-value'>{product.category}</span>
                                    </div>
                                    <div className="product-price">
                                        <span className='total-price'>Rs. {product.discountPercentage > 0 ? calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2) : product.price}</span>
                                    </div>
                                    <div className="product-discount mb-2">
                                        {
                                            product.discountPercentage > 0 ?
                                                <>
                                                    <del className='actual-price'>Rs. {product.price}</del>
                                                    <small className='actual-discount'>-{product.discountPercentage} %</small>
                                                </>
                                                : ""
                                        }

                                    </div>
                                    <div className="product-description">
                                        <p>{product.description}</p>
                                    </div>

                                    <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                    <FormControl style={{ width: "60%" }} className='mt-4 mb-2'>
                                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={quantity}
                                            label="Quantity"
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Select>
                                    </FormControl> <br />

                                    {
                                        isCartProduct ? <button className='btn btn-danger shadow mt-2' style={{ padding: "0.7rem 2rem", fontSize: "1.1rem" }} onClick={() => handleRemoveFromCart(product.id)}>Remove From Cart</button> : <button onClick={() => handleAddToCart(product)} className='btn btn-main shadow mt-2' style={{ padding: "0.7rem 3.5rem", fontSize: "1.1rem" }}>Add to Cart</button>
                                    }

                                    <Toaster />

                                </Grid>

                                <Grid item xs={12} sm={12} lg={4} sx={{ py: 4 }}>
                                    <div className="d-xl-block d-sm-flex align-items-sm-start d-block ms-xl-4 ms-0">
                                        <div className="delivery-occurances me-xl-0 me-3">

                                            <h6>Delivery</h6>

                                            <div className="delivery-time mb-3">
                                                <div className="delivery-icon">
                                                    <FiCodesandbox />
                                                </div>
                                                <div className="delivery-details">
                                                    <div className="delivery-type">
                                                        <strong>Standard Delivery</strong> 15 Jul - 20 Jul
                                                    </div>
                                                    <div className="delivery-aspected-time">
                                                        4 - 9 day(s)
                                                    </div>
                                                </div>
                                            </div>

                                            <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                            <div className="online-delivery mb-3 mt-2">
                                                <div className="delivery-icon">
                                                    <PiCashRegisterLight />
                                                </div>
                                                <div className="online-delivery-details">
                                                    <p>Cash On Delivery Available</p>
                                                </div>
                                            </div>

                                            <Divider style={{ backgroundColor: "#ddd", marginTop: "-.5rem" }} />

                                            <h6 className='mt-3'>Service</h6>

                                            <div className="delivery-warrenty mb-3">
                                                <div className="delivery-icon">
                                                    <RiExchange2Line />
                                                </div>
                                                <div className="warrenty-details">
                                                    <div className="warrenty-time">
                                                        <p>{product.returnPolicy}</p>
                                                    </div>
                                                    <div className="warrenty-type">
                                                        <small>Change of Mind applicable</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="delivery-availability">
                                                <div className="delivery-icon">
                                                    <MdOutlineNotInterested />
                                                </div>
                                                <div className="delivery-availibility-status">
                                                    <p>{product.warrantyInformation}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="stats-occurances mt-xl-3 mt-0">

                                            <h6>Sold by</h6>

                                            <div className="stats-container">
                                                <div className="stats-box">
                                                    <div className="stats-label">Positive Seller Ratings</div>
                                                    <div className="stats-value">90%</div>
                                                </div>
                                                <div className="stats-box">
                                                    <div className="stats-label">Ship on Time</div>
                                                    <div className="stats-value">99%</div>
                                                </div>
                                                <div className="stats-box">
                                                    <div className="stats-label">Chat Response Rate</div>
                                                    <div className="stats-value">86%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>

                            <Grid container spacing={4} sx={{ my: 5 }} className='shadow p-4' style={{ backgroundColor: "#fff" }}>
                                <Grid item xs={12} >
                                    <ReviewsAndRatings product={product} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} className='mt-5'>

                                <h4>Related Products</h4>

                                <div className="row">
                                    {
                                        productsByCategories?.map((product) => {
                                            return (
                                                <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                                                    <ProductCard product={product} discountPrice={calculateDiscountedPrice} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </Grid>
                        </>
                    }
                </div>
            </section>
        </>
    )
}

export default ProductDetail
