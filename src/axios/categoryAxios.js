import axios from "axios";
import Swal from "sweetalert2";
import { swalConfirmButtonColor, swalCancelButtonColor } from "../helpers/commonVariables";
import { baseUrl } from "../helpers/axiosHelper";

const endpoint = '/categories';

const getCategories = async (cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: baseUrl + endpoint,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        });

        cb(result.data.data);
    } catch(err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Failed to fetch Categories',
            confirmButtonColor: swalConfirmButtonColor,
            cancelButtonColor: swalCancelButtonColor
        });
    }
}

export default getCategories;