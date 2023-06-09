import { baseUrl } from "../helpers/axiosHelper";
import axios from "axios";
import Swal from "sweetalert2";
import { swalCancelButtonColor, swalConfirmButtonColor } from '../helpers/commonVariables';

const endpoint = '/products';
let isLoading = false;

const getSellerProducts = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: baseUrl + endpoint + `/seller/${localStorage.getItem('id')}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        });

        cb(result.data.data);
    } catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: err.response.status !== 500
                ? err.response.data.message
                : 'Server error occurred',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

const getProductById = async (id, cb) => {
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
            icon: 'error',
            title: 'Oops!',
            text: err.response.status !== 500
                ? err.response.data.message
                : 'Server error occurred',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

const searchProduct = async (query, cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: baseUrl + endpoint + `/seller/${localStorage.getItem('id')}/search/${query}`,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        });

        cb(result.data.data);
    } catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: err.response.status !== 500
                ? err.response.data.message
                : 'Server error occurred',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

const addProduct = async (product) => {
    try {
        isLoading = true;

        await axios({
            method: 'POST',
            url: baseUrl + endpoint + '/add',
            data: product,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem('access_token')
            }
        }).then((result) => {
            isLoading = false;

            if (!isLoading) {
                Swal.fire({
                    title: 'Yay!',
                    icon: 'success',
                    text: 'Successfully added your product',
                    confirmButtonColor: swalConfirmButtonColor
                });
            }
        });
    } catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: err.response.status !== 500
                ? err.response.data.message
                : 'Server error occurred',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

const updateProduct = async (id, product) => {
    try {
        isLoading = true;

        await axios({
            method: 'PUT',
            url: baseUrl + endpoint + `/update/${id}`,
            data: product,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem('access_token')
            }
        }).then((result) => {
            isLoading = false;

            if (!isLoading) {
                Swal.fire({
                    title: 'Yay!',
                    icon: 'success',
                    text: 'Successfully updated your product',
                    confirmButtonColor: swalConfirmButtonColor
                });
            }
        })
    } catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: err.response.status !== 500
                ? err.response.data.message
                : 'Server error occurred',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

const deleteProduct = async (id, cb) => {
    Swal.fire({
        title: 'Hold up!',
        text: 'Are you sure you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: swalConfirmButtonColor,
        cancelButtonColor: swalCancelButtonColor,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                cb(true);
                let deleteProduct = await axios({
                    method: 'DELETE',
                    url: baseUrl + endpoint + `/delete/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: deleteProduct.data.message,
                    confirmButtonColor: swalConfirmButtonColor,
                    cancelButtonColor: swalCancelButtonColor
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                        cb(false)
                    }
                });
            } catch(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: err.response.status !== 500
                        ? err.response.data.message
                        : 'Server error occurred',
                    confirmButtonColor: swalConfirmButtonColor,
                    cancelButtonColor: swalCancelButtonColor
                });
            }
        }
    });
}

export { 
    getSellerProducts,
    getProductById,
    searchProduct,
    addProduct,
    updateProduct,
    deleteProduct
};