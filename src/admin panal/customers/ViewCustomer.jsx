import React, { useEffect, useState } from 'react'
import { Grid, Box, InputLabel, MenuItem, FormControl, Select, TextField, Pagination, Stack } from '@mui/material';
import { MdError } from "react-icons/md";
import { BackDropLoader } from '../../features';
import { } from '../../jsonData/apiProducts';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { fetchingAllUsers } from '../../jsonData/apiUsers';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import "./css/customer.css"

function ViewCustomer() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [role, setRole] = useState("");
  const [hexCode, setHexCode] = useState("");

  // Get All Products

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const { customers, total } = await fetchingAllUsers(page);
      setCustomers(customers);
      setFilteredCustomers(customers);
      setTotalPages(Math.ceil(194 / total));
      setLoading(false);
      setError(false);
    } catch (error) {
      setError("Error in Customer ::", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [page]);

  // Edit / Delete
  const handleDelete = (id) => {
    const filteredUsers = customers.filter((customer) => customer.id !== id);
    // Notification Msg
    toast.success("Successfully Delete Customer", {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored"
    });
    setTimeout(() => {
      setFilteredCustomers(filteredUsers);
    }, 2500)
  }

  // Filtered Customers
  const handleFilteredCustomers = (e) => {
    const value = e.target.value;
    const filteredUsers = customers.filter(({ firstName, lastName, role, username }) => {
      return firstName.includes(value) || lastName.includes(value) || username.includes(value) || role === value;
    });
    setFilteredCustomers(filteredUsers);
  }

  // Handle Page Change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Hanle User Roles
  const handleRoles = (role) => {
    switch (role) {
      case "admin":
        return <p className='user-role admin'>{role}</p>

      case "moderator":
        return <p className='user-role moderator'>{role}</p>

      default:
        return <p className='user-role user'>{role}</p>
    }
  }

  // Generate Random Colors

  const generateRandomColor = () => {
    const character = "0123456789abcdef";
    let color = "#";
    for (let index = 0; index < 6; index++) {
      color += character[Math.floor(Math.random() * 16)];
      setHexCode(color);
    }
  }

  useEffect(() => {
    generateRandomColor();
  }, [])

  return (
    <>
      <Grid sx={{ mt: 5, mb: 0, px: 3 }}>

        <Grid xs={12}>

          <div className='d-lg-flex align-items-lg-center justify-content-lg-between'>
            <h4 className='mb-3 me-4 w-100' style={{ fontWeight: "bold", color: "#555" }}>View Customers</h4>
            <div className='d-sm-flex align-content-sm-center'>
              <FormControl fullWidth className='me-3 mb-sm-0 mb-3'>
                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={role}
                  label="Role"
                  onChange={(e) => handleFilteredCustomers(e)}
                >
                  {
                    ["admin", "moderator", "user"].map((role, ind) => {
                      return <MenuItem value={role}>{role}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              <TextField fullWidth id="outlined-basic" onChange={(e) => handleFilteredCustomers(e)} label="Search User" variant="outlined" />
            </div>
          </div>
        </Grid>

        {loading && <BackDropLoader />}
        {error && <p className='text-danger'><MdError style={{ marginBottom: ".2rem" }} /> {error}</p>}

        <div className='p-3 mt-4 border table-responsive' style={{ borderRadius: "none" }}>


          <table className='border table table-bordered'>
            <thead className='bg-light'>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Phone Number</th>
                <th className='text-center'>Role</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredCustomers ? filteredCustomers.map(({ id, firstName, lastName, image, phone, email, address, gender, username, role }) => {
                  return (
                    <tr
                      key={id}
                    >
                      <td component="th" scope="row">
                        {id}
                      </td>
                      <td className='d-flex align-items-center'>
                        <div className='d-flex align-items-center justify-content-center' style={{ fontSize: "1.3rem", width: "30px", height: "30px", borderRadius: "50%", color: "#fff", backgroundColor: `${hexCode}` }}>{firstName[0]}</div>
                        <span className='ms-3'>{firstName} {lastName}</span>
                      </td>
                      <td>{email}</td>
                      <td>{username}</td>
                      <td>{gender}</td>
                      <td>{address.country}</td>
                      <td>{phone}</td>
                      <td className='text-center'>
                        {handleRoles(role)}
                      </td>
                      <div className="text-center d-flex align-items-center justify-content-center product-action">
                        <Link to={`/dashboard/editCustomer/${id}`}>
                          <FaPencilAlt />
                        </Link>
                        <RiDeleteBin6Line className='ms-2' onClick={() => handleDelete(id)} />
                       
                      </div>
                    </tr>

                  )
                })
                  :
                  <p>No Products are found</p>
              }
            </tbody>
          </table>
        </div>

      </Grid>

      <Toaster />

      <div className="pagination mt-5 me-5">
        <Stack spacing={5}>
          <Pagination count={totalPages} onChange={handlePageChange} variant="outlined" shape="rounded" size="small" style={{ color: "orange" }} />
        </Stack>
      </div>
    </>
  )
}

export default ViewCustomer
