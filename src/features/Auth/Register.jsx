import React, { useState } from 'react';
import "./css/auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import loginImage from "../../../public/assets/images/register.svg"
import { BeatLoader } from 'react-spinners';

function Register() {

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Random ID
  const uniqueID = Date.now();

  // Register Data
  const handleRegister = async (data) => {
    setLoading(true);
    const userData = { ...data, userID: uniqueID };
    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!response.ok) throw new Error("something went wrong")
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(userData))

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setLoading(false);
      setError(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <div className='container-fluid login-container'>
      <div className="row">
        <div className="col-6 login-image">
          <img src={loginImage} alt="" />
        </div>
        <div className="col-12 col-md-6 login-credentials">

          <div>
            <h4>Welcome To Shopaholic Heaven!</h4>
            <small className='mb-4 d-block'>Login Your Account</small>

            {error && <p className='text-danger'>** {error}</p>}

            <form action="" onSubmit={handleSubmit(handleRegister)}>
              <div className="firstName">
                <label htmlFor="">First Name</label>
                <input type='name' name='name' {...register("firstName", { required: true })} className='form-control' placeholder='Enter First Name' />
              </div>
              <div className="lastName">
                <label htmlFor="">Last Name</label>
                <input type='name' name='name' {...register("lastName", { required: true })} className='form-control' placeholder='Enter Last Name' />
              </div>
              <div className="username">
                <label htmlFor="">User Name</label>
                <input type='name' name='name' {...register("username", { required: true })} className='form-control' placeholder='Enter User Name' />
              </div>
              <div className="email">
                <label htmlFor="">Email</label>
                <input type='email' name='email' {...register("email", { required: true })} className='form-control' placeholder='Enter Email' />
              </div>
              <div className="password">
                <label htmlFor="">Password</label>
                <input type='password' name='password' {...register("password", { required: true })} className='form-control' placeholder='Enter Password' />
              </div>
              <button className={`login-button ${loading ? "active-spinner" : "login-button-hover"}`} disabled={loading ? true : false}>
                {
                  loading ? <BeatLoader size={10} color='#ccc' /> : "Register"
                }
              </button>

              <small className='d-block mt-4'>Already have an account please <Link to={`/login`}>Login</Link></small>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register;
