import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { fetchingCategoriesData } from '../../jsonData/apiProducts';
import { BackDropLoader, Loader } from "../../features/index";
import { MdError } from "react-icons/md";
import { Toaster, toast } from 'react-hot-toast';

function ViewCategory() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);

    // Fetching All Categoires
    const fetchingCategoryData = async () => {
        setLoading(true);
        const categoriesData = await fetchingCategoriesData(setError);
        setCategories((prevCateg) => {
            const newCategories = categoriesData.filter((category) => {
                return !prevCateg.some((c) => c.slug === category.slug)
            })

            return [...prevCateg, ...newCategories]
        })
        setLoading(false);
        setError(false)
    }

    useEffect(() => {
        fetchingCategoryData();
    }, [])

    // Delete Category
    const handleDelete = (slug) => {
        const newCategories = categories.filter((category) => category.slug !== slug);

        // Notification Msg
        // Notification Msg
        toast.success("Successfully Delete Category", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
        setTimeout(() => {
            setCategories(newCategories);
        }, 2500)
    }

    return (
        <>
            <Grid sx={{ mt: 5, mb: 0, px: 3 }}>
                <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
                    <h2 className='dashboard-heading mb-4'>View Category</h2>
                    <div className="d-sm-block d-none">
                        <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
                            <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
                            <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
                            <Typography className='breadcrumb-item-active' color="text.primary">View Category</Typography>
                        </Breadcrumbs>
                    </div>
                </Grid>

                {loading && <BackDropLoader />}
                {error && <p className='text-danger'><MdError style={{ marginBottom: ".2rem" }} /> Something went wrong.</p>}

                <TableContainer className='border p-3 mt-4' style={{ borderRadius: "none" }}>


                    <Table sx={{ minWidth: 650, border: "1px solid #ddd" }} aria-label="simple table">
                        <TableHead className='bg-light'>
                            <TableRow>
                                <TableCell align="left"><strong>ID</strong></TableCell>
                                <TableCell align="center"><strong>Category Name</strong></TableCell>
                                <TableCell align="center"><strong>Category Slug</strong></TableCell>
                                <TableCell align="center"><strong>Delete</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category, id) => (
                                <TableRow
                                    key={category.slug}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {id + 1}
                                    </TableCell>
                                    <TableCell align="center">{category.name}</TableCell>
                                    <TableCell align="center">{category.slug}</TableCell>
                                    <TableCell align="center">
                                        <button className='btn btn-danger' onClick={() => handleDelete(category.slug)}>Delete</button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Toaster />

            </Grid>
        </>
    )
}

export default ViewCategory
