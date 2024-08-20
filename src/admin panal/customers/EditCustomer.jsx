import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, TextField, InputLabel, MenuItem, FormControl, Select, Breadcrumbs, Typography, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { fetchingCategoriesDataList, fetchingSingleProduct } from '../../jsonData/apiProducts';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { fetchingSingleUser } from '../../jsonData/apiUsers';
import { BackDropLoader } from '../../features';
import "./css/customer.css"

function EditUser() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Navigate user
  const navigate = useNavigate();

  // Get All Products
  const getCustomer = async () => {
    setLoading(true);
    const customerData = await fetchingSingleUser(id);
    setUser(customerData);

    // initial values
    setValue("firstName", customerData?.firstName);
    setValue("lastName", customerData?.lastName);
    setValue("email", customerData?.email);
    setValue("phone", customerData?.phone);
    setValue("username", customerData?.username);
    setValue("city", customerData?.address?.city);
    setValue("country", customerData?.address?.country);
    setValue("state", customerData?.address?.state);
    setValue("role", customerData?.role);
    setValue("gender", customerData?.gender);
    setValue("birthDate", customerData?.birthDate);

    setLoading(false);
  }

  useEffect(() => {
    getCustomer();
  }, [])


  // Edit Products
  const handleEditCustomer = async (data) => {

    const updateCustomer = {
      firstName: firstName ? firstName : data.firstName,
      lastName: lastName ? lastName : data.lastName,
      email: email ? email : data.email,
      phone: phone ? phone : data.phone,
      username: username ? username : data.username,
      address: city || country ? 
      { city: city ? city : data.city, country: country ? country : data.country, state: state ? state : data.state  } 
      : 
      { city: data.city, country: data.country, state: data.state },
      role: role ? role : data.role,
      gender: gender ? gender : data.gender,
      birthDate: birthDate ? birthDate : data.birthDate
    }

    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateCustomer)
      });

      // error throwing
      if (!response.ok) throw new Error("Data could not edit");

      const editData = await response.json();
      console.log("Successfuly Edit Data", editData);

      // Notification Msg
      toast.success("Successfully Edit Data", {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored"
      });

      setTimeout(() => {
        navigate("/dashboard/viewCustomer");
      }, 2500);

    } catch (error) {
      setError("Something went wrong ::", error.message);
    }
  }

  return (
    <>
      <Grid sx={{ mt: 5, mb: 0, px: 3 }}>

        <Grid item xs={12} className='d-flex align-items-center justify-content-between'>
          <h2 className='dashboard-heading mb-4'>Edit Customer</h2>
          <div className="d-sm-block d-none">
            <Breadcrumbs aria-label="breadcrumb" className='dashboard-breadcrumb'>
              <Typography className='breadcrumb-item' color="inherit" href="/">Shopaholic Heaven</Typography>
              <Typography className='breadcrumb-item' color="inherit" href="/">Dashboard</Typography>
              <Typography className='breadcrumb-item-active' color="text.primary">Edit Customer</Typography>
            </Breadcrumbs>
          </div>
        </Grid>

        {loading && <BackDropLoader />}
        {error && <p className='text-danger'>{error}</p>}

        {
          user &&
          <div className="row">
            <div className='col-12 mt-2 mx-auto shadow p-4'>
              <h6 style={{ fontSize: "1.3rem" }}>Account</h6>
              <p style={{ fontSize: ".9rem" }}>Fill in the information below to add a new account</p>

              <Divider className='mb-4' style={{ backgroundColor: "#aaa" }} />

              <form onSubmit={handleSubmit(handleEditCustomer)}>
                <Box
                  noValidate
                  autoComplete="off"
                >
                  <div className="d-md-flex align-items-md-center d-block">
                    <div className='w-100'>
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">First Name <span className='text-danger'>*</span></label>
                      <input id="firstName" defaultValue={user.firstName} onChange={(e) => setFirstName(e.target.value)} name='firstName' className='text-field mb-3 form-control' fullWidth variant="outlined" />
                      {errors.firstName && <span>First Name is required</span>}
                    </div>

                    <div className='w-100 mx-md-3'>
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">last Name <span className='text-danger'>*</span></label>
                      <input id="lastName" defaultValue={user.lastName} onChange={(e) => setLastName(e.target.value)} name='lastName' className='text-field mb-3 form-control' fullWidth variant="outlined" />
                      {errors.lastName && <span>Last Name is required</span>}
                    </div>

                    <div className='w-100'>
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Email <span className='text-danger'>*</span></label>
                      <input id="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} className='text-field mb-3 form-control' fullWidth variant="outlined" />
                      {errors.email && <span>Email is required</span>}
                    </div>
                  </div>

                  <div className="d-md-flex align-items-md-center d-block">
                    <div className='w-100'>
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Username <span className='text-danger'>*</span></label>
                      <input id="username" defaultValue={user.username} onChange={(e) => setUsername(e.target.value)} name='username' className='text-field mb-3 form-control' fullWidth variant="outlined" />
                      {errors.username && <span>Username is required</span>}
                    </div>

                    <div className='w-100 mx-md-3'>
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Phone <span className='text-danger'>*</span></label>
                      <input id="phone" defaultValue={user.phone} onChange={(e) => setPhone(e.target.value)} name='phone' className='text-field form-control mb-3' fullWidth variant="outlined" />
                      {errors.phone && <span>Phone Number is required</span>}
                    </div>

                    <div className="w-100">
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">City <span className='text-danger'>*</span></label>
                      <input id="city" defaultValue={user?.address?.city} onChange={(e) => setCity(e.target.value)} name='city' className='text-field mb-3 form-control' fullWidth variant="outlined" />
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
                            onChange={(e) => setRole(e.target.value)}
                            className='mb-3'
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
                            onChange={(e) => setGender(e.target.value)}
                            className='mb-3'
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
                      <input type='date' defaultValue={user.birthDate} onChange={(e) => setBirthDate(e.target.value)} name="date" className='text-field mb-3 w-100 form-control' variant="outlined" />
                      {errors.date && <span>Birth Date is required</span>}
                    </div>

                    <div className='w-100 mx-md-3'>
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">Country <span className='text-danger'>*</span></label>
                      <input id="country" defaultValue={user?.address?.country} onChange={(e) => setCountry(e.target.value)} name='country' className='text-field mb-3 form-control' fullWidth label="Enter Customer Country" variant="outlined" />
                      {errors.country && <span>Country is required</span>}
                    </div>

                    <div className="w-100">
                      <label className='mb-2' style={{ fontSize: ".9rem", color: "#666" }} htmlFor="">State <span className='text-danger'>*</span></label>
                      <input id="state" defaultValue={user?.address?.state} onChange={(e) => setState(e.target.value)} name='state' className='text-field mb-3 form-control' fullWidth label="Enter State" variant="outlined" />
                      {errors.state && <span>State is required</span>}
                    </div>
                  </div>

                  <button type='submit' style={{ fontSize: "1rem" }} className='btn btn-main shadow mt-4'>Add New Customer</button>
                  <Toaster />
                </Box>
              </form>
            </div>
          </div>
        }

      </Grid>
    </>
  )
}

export default EditUser
