import React, { useState } from "react";
import logo from '../../assets/shopaholic_seller_logo.png';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { AiFillPhone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import './auth.css';
import validInputs from "../../helpers/validInputsForNumericForm.js";
import { register } from "../../axios/sellerAxios.js";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { swalCancelButtonColor, swalConfirmButtonColor } from '../../helpers/commonVariables.js';

const RegisterScreen = () => {
    const [form, setForm] = useState({
        email: '',
        name: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const registerHandler = () => {
        setLoading(true);
        register(form).then(() => {
            setLoading(false);
        })
    }

    const cancelHandler = () => {
        if (form.email === '' && form.name === '' && form.phone_number === '' && form.password === '' && form.confirm_password === '') {
            navigation(-1)
        } else {
            Swal.fire({
                title: 'Hold up!',
                text: 'Are you sure you want to cancel the registration process?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigation(-1)
                }
            });
        }
    }

    return(
        <>
            <div className='auth-screen'>
                <img src={logo} className='auth-logo mt-4' alt='#' />
                <div className="card text-black p-4 px-5 mb-4 mt-2">
                    <div className='card-body'>
                        <h4 className='heading text-center'>Create an Account to Start Selling!</h4>

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
                            <FaUserAlt size={20} className='auth-icon' />
                            <div className='container'>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                name: e.target.value
                                            })
                                        }}
                                        required
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder='name@example.com'
                                    />
                                    <label for="floatingInput">Name</label>
                                </div>
                            </div>
                        </div>

                        <div className='sized-box-small' />
                        <div className='form-layout'>
                            <AiFillPhone size={20} className='auth-icon' />
                            <div className='container'>
                                <div className="form-floating mb-3">
                                    <input
                                        onKeyDown={(e) => {
                                            if (!validInputs.includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                phone_number: e.target.value
                                            })
                                        }}
                                        required
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder='name@example.com'
                                    />
                                    <label for="floatingInput">Phone Number</label>
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

                        <div className='sized-box-small' />
                        <div className='form-layout'>
                            <FaLock size={20} className='auth-icon' />
                            <div className='container'>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                confirm_password: e.target.value
                                            })
                                        }}
                                        required
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Confirm Password"
                                    />
                                    <label for="floatingPassword">Confirm Password</label>
                                </div>
                            </div>
                        </div>

                        <div className='sized-box-medium' />
                        {!loading ? <div className='btn-layout'>
                            <input
                                onClick={() => registerHandler()}
                                className='auth-btn text-white btn main-color me-2'
                                type='submit'
                                value='Register'
                            />
                            <input
                                onClick={() => cancelHandler()}
                                className='auth-btn text-white btn btn-danger'
                                type='submit'
                                value='Cancel'
                            />
                        </div> : <div className='btn-layout'>
                            <div className="login-btn btn main-color btn-lg">
                                <ReactLoading
                                    type='cylon'
                                    height={35}
                                    width={35}
                                    className='mx-auto'
                                />
                            </div>
                        </div>}

                    </div>
                </div>
            </div>    
        </>
    );
}

export default RegisterScreen;