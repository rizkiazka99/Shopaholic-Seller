import { baseUrl } from '../helpers/axiosHelper';
import Swal from 'sweetalert2';
import axios from 'axios';
import { swalCancelButtonColor, swalConfirmButtonColor } from '../helpers/commonVariables';

const endpoint = '/sellers';

const login = async (seller, cbHandler) => {
    if (seller.email === '' && seller.password === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'E-mail and Password fields cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.email === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'E-mail field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.password === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'Password field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else {
        try {
            let result = await axios({
                method: "POST",
                url: baseUrl + endpoint + '/login',
                data: seller
            });
    
            const access_token = result.data.access_token;
            const id = result.data.data.id;
            const role = result.data.data.role;
    
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('id', id);
            localStorage.setItem('role', role);
    
            cbHandler(true);
    
            Swal.fire({
                title: 'Yay!',
                text: 'Login successful, hi there!',
                icon: 'success',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } catch(err) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: err.response.status !== 500
                    ? err.response.data.message
                    : 'Servor error occurred',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        }
    }
}

const register = async (seller) => {
    if (seller.email === '' && seller.name === '' && seller.phone_number === '' && seller.password === '' && seller.confirm_password === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'All fields cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.email === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'E-mail field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.name === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'Name field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.phone_number === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'Phone Number field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.password === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'Password field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else if (seller.confirm_password === '') {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: 'Confirm Password field cannot be left empty',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    } else {
        if (seller.password !== seller.confirm_password) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Password was not confirmed',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else {
            try {
                let result = await axios({
                    method: 'POST',
                    url: baseUrl + endpoint + '/register',
                    data: seller
                });
    
                Swal.fire({
                    title: 'Yay!',
                    icon: 'success',
                    text: result.data.message,
                    confirmButtonColor: swalConfirmButtonColor,
                    cancelButtonColor: swalCancelButtonColor
                }).then(async (register) => {
                    if (register.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            } catch(err) {
                Swal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: err.response.data.message 
                        === 'SequelizeValidationError: Validation error: Validation isEmail on email failed'
                        ? 'Invalid E-mail' : err.response.status !== 500
                        ? err.response.data.message
                        : 'Server error occurred',
                    confirmButtonColor: swalConfirmButtonColor,
                    cancelButtonColor: swalCancelButtonColor
                });
            }
        }
    }
}

const getSellerById = async (id, cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: baseUrl + endpoint + `/${id}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        });

        cb(result.data.data);
    } catch(err) {
        Swal.fire({
            title: 'Oops!',
            icon: 'error',
            text: err.response.status !== 500
                ? err.response.data.message
                : 'Servor error occurred',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

const logout = async (cbHandler) => {
    Swal.fire({
        title: 'Hold up!',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: swalConfirmButtonColor,
        cancelButtonColor: swalCancelButtonColor,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(async (result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            cbHandler(true);
            Swal.fire({
                icon: 'success',
                title: 'Yay!',
                text: 'Successfully logged out of your Account, see you later!',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            }).then(async (result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    });
}

export {
    login,
    register,
    getSellerById,
    logout
}