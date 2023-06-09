import React, { useEffect, useState } from "react";
import { deleteProduct, getSellerProducts, searchProduct } from "../../axios/productAxios"
import getCategories from "../../axios/categoryAxios"
import './contents.css';
import { AddProductModal, EmptyIndicator, EmptySearchResult, LoadingIndicator, UpdateProductModal } from "../../components";
import { MdModeEditOutline, MdDelete, MdVisibility } from 'react-icons/md';
import { Link } from "react-router-dom";
import { baseApiUrl } from "../../helpers/commonVariables";

const ProductsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState();
    let categorySelections = [];
    const [query, setQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories((result) => {
            setCategories(result);
            setLoading(false);
        });
        query.length === 0 
            ? getSellerProducts((result) => {
                setProducts(result);
                setLoading(false);
            }) : searchProduct(query, (result) => {
                setProducts(result);
                setLoading(false);
            });
    }, [ query ]);

    categories?.map((category) => {
        categorySelections.push({
            value: category.id,
            label: category.name
        });

        return category;
    });

    const deleteProductHandler = (id) => {
        setLoading(true);
        deleteProduct(id).then(() => {
            setLoading(false)
        })
    }

    return(
        <>
            <div className='header'>
                <div className="header-item">
                    <h3 className='heading'>Your Products</h3>
                    <p>Take a look at what you have in store, literally!</p>
                </div>
                { !loading? <div className="header-item">
                    <input
                        onClick={() => setShowAddModal(true)}
                        className='content-btn text-white btn main-color'
                        type='submit'
                        value='+ Add Product'
                    />
                    <AddProductModal
                        show={showAddModal}
                        onHide={() => setShowAddModal(false)}
                        categorySelections={categorySelections}
                    />
                </div> : <></> }
            </div>

            <hr className="mt-0"></hr>

            <input 
                className="form-control mb-2"
                type="text"
                placeholder="Search Product"
                aria-label="search"
                onChange={(e) => {
                    e.target.value.length !== 0
                        ? setQuery(e.target.value)
                        : setQuery('')
                }}
            />

            { loading ? <LoadingIndicator></LoadingIndicator>
                    : !loading && query === '' && products.length === 0 ? <EmptyIndicator></EmptyIndicator>
                    : !loading && query !== '' && products.length === 0 ? <EmptySearchResult></EmptySearchResult>
                    : !loading && products.length > 0 ? <div className="products-section">
                        {
                            products.map((product) => {
                                const { id, name, buy_price, sell_price, stock, Category, thumbnail } = product;
                                
                                return(
                                    <div className='card'>
                                        <div className='card-body'>
                                            <img 
                                                src={
                                                    !thumbnail ? 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
                                                        : baseApiUrl + thumbnail
                                                }
                                                className="card-img-top"
                                            />
                                            <div className="card-title mt-1">
                                                <div className="card-title-item">
                                                    <h6>{name}</h6>
                                                </div>
                                                <div className="card-title-item">
                                                    <Link>
                                                        <MdModeEditOutline
                                                            onClick={() => setShowUpdateModal(true)}
                                                            size={20}
                                                        />
                                                        <UpdateProductModal
                                                            show={showUpdateModal}
                                                            onHide={() => setShowUpdateModal(false)}
                                                            categorySelections={categorySelections}
                                                            id={+id}
                                                        />
                                                    </Link>
                                                    <Link>
                                                        <MdDelete
                                                            onClick={() => deleteProductHandler(id)}
                                                            className="ms-2 me-0"
                                                            color="#FF0000"
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </div>

                                            <hr className="mt-0"></hr>

                                            <div className="category-section">
                                                <div className='category-item'>
                                                    <p className="p-0 m-0">Buy: ${buy_price}</p>
                                                    <p className="p-0 m-0">Sell: ${sell_price}</p>
                                                    <p className="p-0 m-0">Stock: {stock}</p>
                                                </div>
                                                <div className="category-item">
                                                    <div className="category">
                                                        <p className="text-white">{Category.name}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        } 
                    </div> : <></>
            } 
        </>
    );
}

export default ProductsScreen;