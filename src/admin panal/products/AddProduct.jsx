import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, Typography, Button, Breadcrumbs } from '@mui/material';
import { useForm } from "react-hook-form";
import { fetchingCategoriesDataList } from '../../jsonData/apiProducts';
import { Toaster, toast } from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import { FiUploadCloud } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import "./css/product.css"

function AddProduct() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [textDescription, setTextDescription] = useState("");
    const [rating, setRating] = useState(null);
    const [warrenty, setWarrenty] = useState("");
    const [brand, setBrand] = useState("");
    const [discount, setDiscount] = useState(null);
    const [file, setFile] = useState("");

    const navigate = useNavigate();

    // Get All Categories
    const fetchingCategories = async () => {
        const categoriesData = await fetchingCategoriesDataList();
        setCategories(categoriesData);
    }

    useEffect(() => {
        fetchingCategories();
    }, []);

    useEffect(() => {
        setValue('category', category);
    }, [category, setValue]);

    const addProduct = async (data) => {
        if (file) {
            const optionalData = {
                description: textDescription,
                warrantyInformation: warrenty,
                brand: brand,
                rating: rating,
                discountPercentage: discount,
                thumbnail: file[0].name
            }
            const newData = { ...data, ...optionalData }
            try {
                const response = await fetch('https://dummyjson.com/products/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });
                const postData = await response.json();
                console.log("data post", postData, postData.thumbnail);

                // Notification Msg
                toast.success("Successfully Add Product Data", {
                    position: "bottom-right",
                    autoClose: 1200,
                    theme: "colored"
                });

                setError(false);
                setTimeout(() => {
                    navigate("/dashboard/viewProduct")
                }, 1800);
            } catch (error) {
                console.log(error);
                setError("Add Product Error :: ", error)
            }
        } else {
            // Notification Msg
            toast.error("Please Upload File", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
        }
    }

    // Upload File
    const handleFileUpload = (event) => {
        const files = event.target.files;
        setFile(files);
    };

    return (
        <>
            <Grid sx={{ mt: 5, mb: 0, px: 3 }}>
                <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
                    <h2 className='dashboard-heading mb-4'>Create Product</h2>
                    <div className="d-sm-block d-none">
                        <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
                            <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
                            <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
                            <Typography className='breadcrumb-item-active' color="text.primary">Create Product</Typography>
                        </Breadcrumbs>
                    </div>
                </Grid>

                {error && <p className='text-danger'>{error}</p>}

                <Grid xs={12} sm={10} className='mt-2 mx-auto'>
                    <form onSubmit={handleSubmit(addProduct)}>
                        <Box
                            noValidate
                            autoComplete="off"
                        >
                            <div
                                className="mb-3 shadow bg-white p-4"
                            >
                                <div className='mb-3'>
                                    <h5 style={{ fontSize: ".9rem" }}>Add Product Image</h5>
                                </div>

                                <div style={{
                                    border: '2px dashed #e0e0e0', borderRadius: '8px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    width: '100%',
                                    position: 'relative',
                                }}
                                >
                                    <FiUploadCloud size={40} color="#ff6d00" />
                                    <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                                        <Button component="label" color="primary">Click to browse
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/gif"
                                                hidden
                                                onChange={handleFileUpload}
                                            />
                                        </Button>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {
                                            file ?
                                                <p>{file[0].name}</p>
                                                :
                                                <p>1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
                                        }

                                    </Typography>
                                </div>
                            </div>

                            <Box sx={{ backgroundColor: "bg-white" }} className="p-4 shadow">
                                <div className='d-md-flex align-items-md-center justify-content-md-between'>
                                    <div className='fixed-width-column me-md-3'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Name</h6>
                                        <TextField id="title" name="title" className='mb-3 w-100' {...register("title", { required: true })} label="Enter Product Title" variant="outlined" />
                                        {errors.title && <span className='text-danger mb-3 d-block' style={{ fontSize: ".8rem" }}>** Title is required</span>}
                                    </div>

                                    <div className='fixed-width-column category-column-container'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Category</h6>
                                        <select class="form-select category-column" {...register("category", { required: true })} onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                            <option value="" disabled selected hidden>Select Category</option>
                                            {
                                                categories && categories.map((category, ind) => {
                                                    return <option key={ind + 1} value={category}>{category}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='fixed-width-column w-md-50 ms-md-3'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Price</h6>
                                        <TextField id="price" name='price' {...register("price", { required: true })} className='mb-3' fullWidth label="Enter Product Price" variant="outlined" />
                                        {errors.price && <span className='text-danger mb-3 d-block' style={{ fontSize: ".8rem" }}>** Price is required</span>}
                                    </div>
                                </div>

                                <div className="d-md-flex align-items-md-center justify-content-md-between">
                                    <div className='fixed-width-column'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Discount <span style={{ color: "#999" }}>(optional)</span></h6>
                                        <TextField id="discountPercentage" name='discountPercentage' onChange={(e) => setDiscount(e.target.value)} className='mb-3' fullWidth label="Enter Product Discount Percentage (optional)" variant="outlined" />
                                    </div>

                                    <div className='mx-md-3 fixed-width-column'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Stock</h6>
                                        <TextField id="stock" name='stock' {...register("stock", { required: true })} className='mb-3' fullWidth label="Enter Product Stock" variant="outlined" />
                                        {errors.stock && <span className='text-danger mb-3 d-block' style={{ fontSize: ".8rem" }}>** Stock is required</span>}
                                    </div>

                                    <div className='fixed-width-column'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Brand <span style={{ color: "#999" }}>(optional)</span></h6>
                                        <TextField id="brand" name='brand' onChange={(e) => setBrand(e.target.value)} className='mb-3' fullWidth label="Enter Product Brand (optional)" variant="outlined" />
                                    </div>
                                </div>

                                <div className="d-md-flex align-items-md-center justify-content-md-between">
                                    <div className='fixed-width-column'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Rating <span style={{ color: "#999" }}>(optional)</span></h6>
                                        <TextField id="rating" name='rating' onChange={(e) => setRating(e.target.value)} className='mb-3' fullWidth label="Enter Product Rating (optional)" variant="outlined" />
                                    </div>

                                    <div className='mx-md-3 fixed-width-column'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Warrenty <span style={{ color: "#999" }}>(optional)</span></h6>
                                        <TextField id="warrenty" name='warrenty' onChange={(e) => setWarrenty(e.target.value)} className='mb-3' fullWidth label="Enter Product Stock" variant="outlined" />
                                        {errors.stock && <span className='text-danger mb-3 d-block' style={{ fontSize: ".8rem" }}>** Stock is required</span>}
                                    </div>

                                    <div className='fixed-width-column'>
                                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product SKU</h6>
                                        <TextField id="sku" name='sku' className='mb-3' {...register("sku", { required: true })} fullWidth label="Enter SKU (optional)" variant="outlined" />
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Description</h6>
                                    <JoditEditor
                                        onChange={(newContent) => setTextDescription(newContent)}
                                    />
                                    {errors.description && <span className='text-danger mb-3 mt-2 d-block' style={{ fontSize: ".8rem" }}>** Description is required</span>}
                                </div>

                                <button type='submit' style={{ fontSize: "1rem" }} className='btn btn-main shadow'>Add Your Product</button>
                                <Toaster />
                            </Box>

                        </Box>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

export default AddProduct;