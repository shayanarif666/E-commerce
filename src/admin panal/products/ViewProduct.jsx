import React, { useEffect, useState } from 'react'
import { Grid, Box, InputLabel, MenuItem, FormControl, Select, TextField, Pagination, Stack, Breadcrumbs } from '@mui/material';
import { BackDropLoader } from '../../features';
import { fetchingCategoriesDataList, fetchingProductsData } from '../../jsonData/apiProducts';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { MdError } from "react-icons/md";
import { FaPencilAlt, FaEye, FaRegTrashAlt } from "react-icons/fa";
import "../dashboard/components/css/dashboard.css"

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Get All Categories
    const getAllCategories = async () => {
        const categoriesData = await fetchingCategoriesDataList();
        setCategories(categoriesData);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // Get All Products

    const getAllProducts = async () => {
        setLoading(true);
        const { products, total } = await fetchingProductsData(page);
        console.log("value of total", total);
        setProducts(products);
        setFilteredProducts(products);
        setTotalPages(Math.ceil(194 / total));
        setLoading(false);
        setError(false);
    };

    useEffect(() => {
        getAllProducts();
    }, [page]);

    // Filter Data
    const handleFilteredData = (e) => {
        const value = e.target.value;
        let newProducts = products.filter(({ category, title, description }) => {
            return title.includes(value) || description.includes(value) || category.includes(value);
        })
        setFilteredProducts(newProducts);
    };

    // Edit / Delete
    const handleDelete = (id) => {
        const newProducts = products.filter((product) => product.id !== id);
        // Notification Msg
        toast.success("Successfully Delete Product", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        setTimeout(() => {
            setFilteredProducts(newProducts);
        }, 2500)
    }

    // Handle Page Change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <Grid sx={{ mt: 5, mb: 0, px: 3 }}>

                <div className='d-lg-flex align-items-lg-center justify-content-lg-between'>
                    <h2 className='dashboard-heading mb-4'>View Product</h2>
                    <div className='d-sm-flex align-content-sm-center'>
                        <FormControl fullWidth className='me-3 mb-sm-0 mb-3'>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={category}
                                label="Category"
                                onChange={(e) => handleFilteredData(e)}
                            >
                                {
                                    categories && categories.map((category) => {
                                        return <MenuItem value={category}>{category}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField fullWidth id="outlined-basic" onChange={(e) => handleFilteredData(e)} label="Search Products" variant="outlined" />
                    </div>
                </div>

                {loading && <BackDropLoader />}
                {error && <p className='text-danger'><MdError style={{ marginBottom: ".2rem" }} /> Something went wrong.</p>}


                <div className='p-3 mt-4 border table-responsive' style={{ borderRadius: "none" }}>
                    <table className='border table table-bordered'>
                        <thead className='bg-light'>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Category</th>
                                <th className='text-center'>Brand</th>
                                <th className='text-center'>Stock</th>
                                <th className='text-center'>Discount</th>
                                <th className='text-center'>Rating</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProducts ? filteredProducts.map(({ id, title, category, price, brand, availabilityStatus, stock, rating, discountPercentage }) => {
                                    return (
                                        <tr
                                            key={category.slug}
                                        >
                                            <td scope="row">
                                                {id}
                                            </td>
                                            <td>{title}</td>
                                            <td className='text-center'>$ {price}</td>
                                            <td className='text-center'>{category}</td>
                                            <td className='text-center'>{brand ? brand : "-"}</td>
                                            <td className='text-center'>
                                                {availabilityStatus === "In Stock" ?
                                                    <span className='product-stock-status product-in-Stock p-1' style={{ fontSize: ".8rem" }}>Stock</span>
                                                    :
                                                    <span className='product-stock-status product-low-stock p-1' style={{ fontSize: ".8rem" }}>Low Stock</span>
                                                }
                                            </td>
                                            <td className='text-center'>{discountPercentage ? discountPercentage : "0"}%</td>
                                            <td className='text-center'>{rating}</td>
                                            <td className='text-center product-action '>
                                                <Link to={`/dashboard/editProduct/${id}`}>
                                                    <FaPencilAlt />
                                                </Link>
                                                <Link to={`/dashboard/productDetails/${id}`}>
                                                    <FaEye className='mx-2' />
                                                </Link>
                                                <FaRegTrashAlt onClick={() => handleDelete(id)} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    :
                                    <p>No Products are found</p>
                            }
                        </tbody>
                    </table>
                </div>

                <div className="pagination mt-5 me-sm-auto">
                    <Stack spacing={5}>
                        <Pagination count={totalPages} onChange={handlePageChange} variant="outlined" shape="rounded" size="small" style={{ color: "orange" }} />
                    </Stack>
                </div>

            </Grid>

            <Toaster />


        </>
    )
}

export default ViewProduct
