import React, { useState } from 'react';
import loginImage from "../../../public/assets/images/login-image.svg"
import "./css/auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { login } from "../../redux/authSlices"

function Login() {

    const { register, handleSubmit } = useForm();

    // Get User
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Login Credentials
    const handleLogin = async (data) => {
        setLoading(true);
        const { email, password } = data;
        try {
            setTimeout(() => {
                if (user.email === email && user.password === password) {
                    setLoading(false);
                    dispatch(login(true));

                    setTimeout(() => {
                        navigate("/");
                        setError(false);
                    }, 1800);
                } else {
                    setLoading(false);
                    setError(true);
                }
            }, 500);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }


    return (
        <div className='container-fluid login-container'>
            <div className="row">
                <div className="col-md-6 login-image">
                    <img src={loginImage} alt="" />
                </div>
                <div className="col-12 col-md-6 login-credentials">
                    <div>
                        <h4>Welcome To Shopaholic Heaven!</h4>
                        <small className='mb-4 d-block'>Login Your Account</small>

                        {error && <p className='text-danger'>** Password Or Email is incorrect</p>}

                        <form action="" onSubmit={handleSubmit(handleLogin)}>
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
                                    loading ? <ClipLoader size={22} color='#ccc' /> : "Login"
                                }
                            </button>

                            <small className='d-block mt-4'>Don't have an account please <Link to={`/register`}>Register</Link></small>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;