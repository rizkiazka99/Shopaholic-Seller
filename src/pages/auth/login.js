import React, { useState } from 'react';
import logo from '../../assets/shopaholic_seller_logo.png';
import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import '../../App.css';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../axios/sellerAxios';
import ReactLoading from 'react-loading';

const LoginScreen = (props) => {
    const { loginCbHandler } = props;

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const loginHandler = () => {
        setLoading(true);
        login(form, loginCbHandler).then(() => {
            setLoading(false);
        });

        if (!loading) {
            navigation("/");
        }
    }

    return(
        <>
            <div className='auth-screen'>
                <img src={logo} className='auth-logo' alt='#' />
                <div className="card text-black p-4 px-5 mb-3 mt-2">
                    <div className='card-body'>
                        <h4 className='heading text-center'>Login to Your Account and Start Selling!</h4>

                        <div className='sized-box-medium' />
                        <div className='form-layout'>
                            <IoIosMail size={20} className='auth-icon' />
                            <div className='container'>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                email: e.target.value
                                            })
                                        }}
                                        required
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder='name@example.com'
                                    />
                                    <label for="floatingInput">E-mail</label>
                                </div>
                            </div>
                        </div>

                        <div className='sized-box-small' />
                        <div className='form-layout'>
                            <FaLock size={20} className='auth-icon' />
                            <div className='container'>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                password: e.target.value
                                            })
                                        }}
                                        required
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                    />
                                    <label for="floatingPassword">Password</label>
                                </div>
                            </div>
                        </div>

                        <div className='sized-box-medium' />
                        <div className='btn-layout'>
                            {!loading ? <input
                                onClick={() => loginHandler()}
                                className='auth-btn text-white btn main-color'
                                type='submit'
                                value='Login'
                            /> : <div className="auth-btn btn main-color">
                                <ReactLoading
                                    type='cylon'
                                    height={35}
                                    width={35}
                                    className='mx-auto'
                                />
                            </div>}
                        </div>

                        <div className='sized-box-medium' />
                        {!loading ? <div className='btn-layout'>
                            <p>Don't have an account yet?</p>
                            <Link className='fw-semibold text-decoration-none ms-1' to="/register">
                                <p className='text-btn'>Register</p>
                            </Link>
                        </div> : <></>}
                    </div>
                </div>
            </div>    
        </>
    );

}

export default LoginScreen;