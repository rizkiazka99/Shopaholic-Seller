import axios from "axios";
import Swal from "sweetalert2";
import { swalConfirmButtonColor, swalCancelButtonColor } from "../helpers/commonVariables";
import FormData from 'form-data';
import { baseUrl } from "../helpers/axiosHelper";

const endpoint = '/product_galleries';
let isLoading = false;

const addProductGallery = async (galleries) => {
    isLoading = true;
    let data = new FormData();

    for (let i = 0; i < galleries['product-picture'].length; i++) {
        data.append(`product-picture`, galleries['product-picture'][i]);
    }

    try {
        await axios({
            method: 'POST',
            url: baseUrl + endpoint + '/add',
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem('access_token')
            }
        }).then(() => {
            isLoading = false;

            if (!isLoading) {
                Swal.fire({
                    title: 'Yay!',
                    icon: 'success',
                    message: 'Successfully added Product picture(s)',
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

const deleteProductGallery = async (id) => {
    Swal.fire({
        title: 'Hold up!',
        text: 'Are you sure you want to delete this picture?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: swalConfirmButtonColor,
        cancelButtonColor: swalCancelButtonColor,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
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
    addProductGallery,
    deleteProductGallery
}