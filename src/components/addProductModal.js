import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addProduct } from "../axios/productAxios";
import { addProductGallery } from "../axios/productGalleryAxios";
import { useNavigate } from "react-router-dom";
import validInputs from "../helpers/validInputsForNumericForm";
import ReactLoading from 'react-loading';
import Swal from "sweetalert2";
import { swalConfirmButtonColor, swalCancelButtonColor } from "../helpers/commonVariables";

const AddProductModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        buy_price: 0,
        sell_price: 0,
        stock: 0,
        CategoryId: 0,
        thumbnail: ''
    });

    const addProductHandler = () => {
        if (form.name === '' && form.buy_price === 0 && form.sell_price === 0 && form.stock === 0 && form.CategoryId === 0) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'All fields cannot be left empty',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else if (form.name === '') {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Name field cannot be left empty',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else if (form.buy_price === 0) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Buy Price field cannot be left empty',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else if (form.sell_price === 0) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Sell Price field cannot be left empty',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else if (form.stock === 0) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Stock field cannot be left empty',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else if (form.CategoryId === 0) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Category field cannot be left empty',
                confirmButtonColor: swalConfirmButtonColor,
                cancelButtonColor: swalCancelButtonColor
            });
        } else {
            setLoading(true);
            addProduct(form).then(() => {
                setLoading(false);
                window.location.reload();
            });
        }
    }
    
    return(
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className='heading'
                    >
                        Add Product
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                                        buy_price: +e.target.value
                                    })
                                }}
                                required
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder='0'
                            />
                            <label for="floatingInput">Buy Price</label>
                        </div>
                    </div>

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
                                        sell_price: +e.target.value
                                    })
                                }}
                                required
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder='0'
                            />
                            <label for="floatingInput">Sell Price</label>
                        </div>
                    </div>

                    <div className='container'>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        stock: +e.target.value
                                    })
                                }}
                                required
                                type="number"
                                className="form-control"
                                id="floatingInput"
                                placeholder='0'
                            />
                            <label for="floatingInput">Stock</label>
                        </div>
                    </div>

                    <div className="container">
                        <div className="form-floating mb-3">
                            <select
                                onChange={(e) => setForm({ ...form, CategoryId: +e.target.value})}
                                class="form-select" 
                                aria-label="Default select example" 
                                id="floatingInput">
                            <option value={0} selected>Product Category</option>
                            {
                                props.categorySelections.map((category) => {
                                    const { value, label } = category;
                                    return(
                                        <option value={value}>{label}</option>
                                    )
                                })
                            }
                            </select>
                            <label for="floatingInput">Category</label>
                        </div>
                    </div>

                    <div className="container">
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => {
                                    setPicturesForm({
                                        ...form,
                                        'product-picture': e.target.files[0] 
                                    })
                                    console.log(picturesForm['product-picture'])
                                }}
                                placeholder="Product Picture(s)"
                                type='file'
                                accept="image/jpg, image/jpeg, image/png"
                                className="form-control"
                            />
                            <label for="floatingInput">Product Picture(s) - Optional</label>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                        {!loading ? <input
                            onClick={() => addProductHandler()}
                            className='auth-btn text-white btn main-color'
                            type='submit'
                            value='Add Product'
                        /> : <div className="auth-btn btn main-color">
                            <ReactLoading
                                type='cylon'
                                height={35}
                                width={35}
                                className='mx-auto'
                            />
                        </div>}
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default AddProductModal;