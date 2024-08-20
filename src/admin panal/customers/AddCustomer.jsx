import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, TextField, InputLabel, MenuItem, FormControl, Select, Divider, Breadcrumbs, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'react-hot-toast';
import "../dashboard/components/css/dashboard.css"

function AddUser() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [error, setError] = useState(false);
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        setValue('gender', gender);
        setValue('role', role);
    }, [gender, role, setValue]);

    const addCustomer = async (data) => {
        const newCustomer = data;
        try {
            const response = await fetch("https://dummyjson.com/users/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer)
            });
            const postCustomer = await response.json();

            // Notification Msg
            toast.success("Successfully Add New Customer", {
                position: "bottom-right",
                autoClose: 1500,
                theme: "colored"
            });
            setTimeout(() => {
                console.log("Customer post", postCustomer);
            }, 2500);
        } catch (error) {
            setError("Error in Customer Added :: ", error.message)
        }
    }


    return (
        <>
            <Grid sx={{ mt: 5, mb: 0, px: 3 }}>
                <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
                    <h2 className='dashboard-heading mb-4'>Create Customer</h2>
                    <div className="d-sm-block d-none">
                        <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
                            <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
                            <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
                            <Typography className='breadcrumb-item-active' color="text.primary">Create Customer</Typography>
                        </Breadcrumbs>
                    </div>
                </Grid>

                {error && <p className='text-danger'>{error}</p>}

                <div className="row">
                    <div className='col-12 mt-2 mx-auto shadow p-4'>
                        <h6 style={{ fontSize: "1.3rem" }}>Account</h6>
                        <p style={{ fontSize: ".9rem" }}>Fill in the information below to add a new account</p>

                        <Divider className='mb-4' style={{ backgroundColor: "#aaa" }} />

                        <form onSubmit={handleSubmit(addCustomer)}>
                            <Box
                                noValidate
                                autoComplete="off"
                            >
                                <div className="d-md-flex align-items-md-center d-block">
                                    <div className='w-100'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">First Name <span className='text-danger'>*</span></label>
                                        <TextField id="firstName" name='firstName' {...register("firstName", { required: true })} className='mb-3' fullWidth label="Enter First Name" variant="outlined" />
                                        {errors.firstName && <span>First Name is required</span>}
                                    </div>

                                    <div className='w-100 mx-md-3'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">last Name <span className='text-danger'>*</span></label>
                                        <TextField id="lastName" name='lastName' {...register("lastName", { required: true })} className='mb-3' fullWidth label="Enter Last Name" variant="outlined" />
                                        {errors.lastName && <span>Last Name is required</span>}
                                    </div>

                                    <div className='w-100'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Email <span className='text-danger'>*</span></label>
                                        <TextField id="email" {...register("email", { required: true })} className='mb-3' fullWidth label="Enter Customer Email ID" variant="outlined" />
                                        {errors.email && <span>Email is required</span>}
                                    </div>
                                </div>

                                <div className="d-md-flex align-items-md-center d-block">
                                    <div className='w-100'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Username <span className='text-danger'>*</span></label>
                                        <TextField id="username" name='username' {...register("username", { required: true })} className='mb-3' fullWidth label="Enter Customer Username" variant="outlined" />
                                        {errors.username && <span>Username is required</span>}
                                    </div>

                                    <div className='w-100 mx-md-3'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Phone <span className='text-danger'>*</span></label>
                                        <TextField id="phone" name='phone' {...register("phone")} className='mb-3' fullWidth label="Enter Customer Phone Number" variant="outlined" />
                                        {errors.phone && <span>Phone Number is required</span>}
                                    </div>

                                    <div className="w-100">
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">City <span className='text-danger'>*</span></label>
                                        <TextField id="city" name='city' {...register("city")} className='mb-3' fullWidth label="Enter City" variant="outlined" />
                                        {errors.city && <span>City is required</span>}
                                    </div>
                                </div>

                                <div className="d-md-flex align-items-md-center d-block">
                                    <div className="w-100">
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Role <span className='text-danger'>*</span></label>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="role">Select Role</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    key={role}
                                                    id="role"
                                                    label="Role"
                                                    value={role}
                                                    className='mb-3'
                                                    {...register("role", { required: true })}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    {
                                                        ["customer", "admin", "moderator"].map((role, ind) => {
                                                            return (
                                                                <MenuItem key={ind} value={role}>{role}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                                {errors.role && <span>Role is required</span>}
                                            </FormControl>
                                        </Box>
                                    </div>

                                    <div className="w-100 ms-md-3">
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Gender <span className='text-danger'>*</span></label>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="gender">Select Gender</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    key={gender}
                                                    id="gender"
                                                    label="Gender"
                                                    value={gender}
                                                    className='mb-3'
                                                    {...register("gender", { required: true })}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    {
                                                        ["Male", "Female"].map((gender, ind) => {
                                                            return (
                                                                <MenuItem key={ind} value={gender}>{gender}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                                {errors.gender && <span>Gender is required</span>}
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>

                                <div className="d-md-flex align-items-md-center d-block">
                                    <div className='w-100'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">BirthDate <span className='text-danger'>*</span></label><br />
                                        <TextField type='date' name="date" {...register("date", { required: true })} className='mb-3 w-100' variant="outlined" />
                                        {errors.date && <span>Birth Date is required</span>}
                                    </div>

                                    <div className='w-100 mx-md-3'>
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Country <span className='text-danger'>*</span></label>
                                        <TextField id="country" name='country' {...register("country")} className='mb-3' fullWidth label="Enter Customer Country" variant="outlined" />
                                        {errors.country && <span>Country is required</span>}
                                    </div>

                                    <div className="w-100">
                                        <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">State <span className='text-danger'>*</span></label>
                                        <TextField id="state" name='state' {...register("state")} className='mb-3' fullWidth label="Enter State" variant="outlined" />
                                        {errors.state && <span>State is required</span>}
                                    </div>
                                </div>

                                <button type='submit' style={{ fontSize: "1rem" }} className='btn btn-main shadow'>Add New Customer</button>
                                <Toaster />
                            </Box>
                        </form>
                    </div>
                </div>

            </Grid>
        </>
    )
}

export default AddUser
