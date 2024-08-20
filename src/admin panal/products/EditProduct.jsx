import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, InputLabel, MenuItem, FormControl, Select, Button, Typography, Breadcrumbs } from '@mui/material';
import { useForm } from 'react-hook-form';
import { fetchingCategoriesDataList, fetchingSingleProduct } from '../../jsonData/apiProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';
import JoditEditor from 'jodit-react';
import { BackDropLoader } from "../../features/index";
import { FaStar } from "react-icons/fa";
import "./css/product.css"

function EditProduct() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState(null);
  const [warrenty, setWarrenty] = useState("");
  const [sku, setSku] = useState("");
  const [file, setFile] = useState("");

  // Navigate user
  const navigate = useNavigate();

  // Get All Categories
  const getAllCategories = async () => {
    const categoriesData = await fetchingCategoriesDataList();
    setCategories(categoriesData);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Get All Products
  const getProduct = async () => {
    setLoading(true);
    const productData = await fetchingSingleProduct(id);
    setProduct(productData);

    // Set initial form values
    setValue("title", productData.title);
    setValue("description", productData.description);
    setValue("category", productData.category);
    setValue("price", productData.price);
    setValue("discountPercentage", productData.discountPercentage);
    setValue("stock", productData.stock);
    setValue("brand", productData.brand);
    setValue("thumbnail", productData.thumbnail);
    setValue("sku", productData.sku)

    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, [])

  // Edit Products
  const handleEditProduct = async (data) => {
    setLoading(true);

    const newData = {
      title: title ? title : data.title,
      description: description,
      category: category ? category : product.category,
      price: price ? price : product.price,
      discountPercentage: discountPercentage ? discountPercentage : product.discountPercentage,
      stock: stock ? stock : product.stock,
      brand: brand ? brand : product.brand,
      thumbnail: file ? file[0].name : product.thumbnail,
    }

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });

      // error throwing
      if (!response.ok) throw new Error("Data could not edit");

      const editData = await response.json();
      console.log("Successfuly Edit Data", editData);

      // Notification Msg
      toast.success("Successfully Edit Data", {
        position: "bottom-right",
        autoClose: 1200,
        theme: "colored"
      });

      setTimeout(() => {
        navigate("/dashboard/viewProduct");
      }, 1800);

      setLoading(false);
      setError(false);

    } catch (error) {
      setError("Something went wrong ::", error.message);
    }
  }

  // Upload File
  const handleFileUpload = (event) => {
    const files = event.target.files;
    setFile(files);
  };

  return (
    <>
      <div className='m-4 row'>

        <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
          <h2 className='dashboard-heading mb-4'>Edit Product</h2>
          <div className="d-sm-block d-none">
            <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
              <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
              <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
              <Typography className='breadcrumb-item-active' color="text.primary">Edit Product</Typography>
            </Breadcrumbs>
          </div>
        </Grid>

        {loading && <BackDropLoader />}
        {error && <p className='text-danger'>{error}</p>}

        {
          product && <>
            <div className="col-lg-3">
              <div className="bg-white shadow p-4" style={{ borderRadius: "10px" }}>
                <div className="product-img text-center">
                  <img style={{ width: "250px", height: "250px", borderRadius: "10px" }} src={product.thumbnail} alt="" />
                </div>
                <div className="product-info mt-3">
                  <h6>{product.title}</h6>
                  <small className='text-secondary'>({product.category})</small>
                  <p style={{ fontSize: ".85rem" }} className='mt-3'>{product.description}</p>
                  <h6>Price :</h6>
                  <span style={{ fontSize: ".9rem" }}>${product.price} <del className='ms-2' style={{ fontSize: ".9rem" }}>${product.price}</del> <small style={{ fontSize: ".9rem" }} className='ms-2'>(-{product.discountPercentage} % off)</small></span>
                  <span className='mt-2 d-block' style={{ fontSize: ".8rem" }}>{product.brand}</span>
                  <span className='mt-2 d-block d-flex align-items-center' style={{ fontSize: ".8rem" }}>Rating :
                    <FaStar className='ms-2 me-1' style={{ color: "orange" }} /> {product.rating}
                  </span>
                  <div className='mt-1 d-flex align-items-center'>
                    <span className='mt-2 d-block me-2' style={{ fontSize: ".8rem" }}>Stock : {product.stock}</span>
                    {product.availabilityStatus === "In Stock" ?
                      <span className='product-stock-status product-in-Stock p-1 mt-2 d-inline-block' style={{ fontSize: ".7rem" }}>Stock</span>
                      :
                      <span className='product-stock-status product-low-stock p-1 mt-2 d-inline-block' style={{ fontSize: ".7rem" }}>Low Stock</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-9 edit-form-data'>
              <form onSubmit={handleSubmit(handleEditProduct)}>
                <Box
                  noValidate
                  autoComplete="off"
                >

                  <div
                    className="mb-3 bg-white p-4 shadow"
                    style={{ borderRadius: "10px" }}
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
                            name="thumbnail"
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

                  <Box sx={{ backgroundColor: "bg-white" }} className="p-4 shadow" style={{ borderRadius: "10px" }}>
                    <div className='d-md-flex align-items-md-center justify-content-md-between'>
                      <div className='fixed-width-column me-md-3'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Name</h6>
                        <input id="title" name="title" className='text-field form-control mb-3 w-100' defaultValue={product.title} onChange={(e) => setTitle(e.target.value)} variant="outlined" />
                      </div>

                      <div className='fixed-width-column category-column-container'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product New Category</h6>
                        <select class="form-select category-column" onChange={(e) => setCategory(e.target.value)}>
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
                        <input id="price" name='price' className='text-field form-control mb-3' fullWidth defaultValue={product.price} onChange={(e) => setPrice(e.target.value)} variant="outlined" />
                      </div>
                    </div>

                    <div className="d-md-flex align-items-md-center justify-content-md-between">
                      <div className='fixed-width-column'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Discount <span style={{ color: "#999" }}>(optional)</span></h6>
                        <input id="discountPercentage" name='discountPercentage' defaultValue={product.discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className='text-field form-control mb-3' fullWidth variant="outlined" />
                      </div>

                      <div className='mx-md-3 fixed-width-column'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Stock</h6>
                        <input id="stock" name='stock' className='text-field form-control mb-3' fullWidth defaultValue={product.stock} onChange={(e) => setStock(e.target.value)} variant="outlined" />
                      </div>

                      <div className='fixed-width-column'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Brand <span style={{ color: "#999" }}>(optional)</span></h6>
                        <input id="brand" name='brand' className='text-field form-control mb-3' fullWidth defaultValue={product.brand} onChange={(e) => setBrand(e.target.value)} variant="outlined" />
                      </div>
                    </div>

                    <div className="d-md-flex align-items-md-center justify-content-md-between">
                      <div className='fixed-width-column'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Rating <span style={{ color: "#999" }}>(optional)</span></h6>
                        <input id="rating" name='rating' className='text-field form-control mb-3' fullWidth defaultValue={product.rating} onChange={(e) => setRating(e.target.value)} variant="outlined" />
                      </div>

                      <div className='mx-md-3 fixed-width-column'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Warrenty <span style={{ color: "#999" }}>(optional)</span></h6>
                        <input id="warrenty" name='warrenty' className='text-field form-control mb-3' fullWidth defaultValue={product.warrantyInformation} onChange={(e) => setWarrenty(e.target.value)} variant="outlined" />
                      </div>

                      <div className='fixed-width-column'>
                        <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product SKU</h6>
                        <input id="sku" name='sku' className='text-field form-control mb-3' fullWidth defaultValue={product.sku} onChange={(e) => setSku(e.target.value)} variant="outlined" />
                      </div>
                    </div>

                    <div className='mb-4'>
                      <h6 className='mb-2' style={{ fontSize: ".9rem" }}>Product Description</h6>
                      <JoditEditor
                        value={product.description}
                        onChange={(newContent) => setDescription(newContent)}
                      />
                    </div>

                    <button type='submit' style={{ fontSize: "1rem" }} className='btn btn-main shadow'>Edit Your Product</button>
                    <Toaster />
                  </Box>

                </Box>
              </form>

            </div>
          </>
        }

      </div>
    </>
  )
}

export default EditProduct
