import React, { useEffect, useState } from "react";
import { deleteProduct, getSellerProducts, searchProduct } from "../../axios/productAxios";
import './contents.css';
import { EmptyIndicator, EmptySearchResult, LoadingIndicator } from "../../components";
import { MdModeEditOutline, MdDelete, MdVisibility } from 'react-icons/md';
import { Link } from "react-router-dom";

const ProductsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        query.length === 0 
            ? getSellerProducts((result) => {
                setProducts(result);
                setLoading(false);
            }) : searchProduct(query, (result) => {
                setProducts(result);
                setLoading(false);
            });
    }, [ query ]);

    return(
        <>
            <div className='header'>
                <div className="header-item">
                    <h3 className='heading'>Your Products</h3>
                    <p>Take a look at what you have in store, literally!</p>
                </div>
                <div className="header-item">
                    <input
                        className='content-btn text-white btn main-color'
                        type='submit'
                        value='+ Add Product'
                    />
                </div>
            </div>

            <hr className="mt-0"></hr>

            { products.length !== 0 ? <input 
                className="form-control mb-2"
                type="text"
                placeholder="Search Product"
                aria-label="search"
                onChange={(e) => {
                    e.target.value.length !== 0
                        ? setQuery(e.target.value)
                        : setQuery('')
                }}
            /> : <></> }

            { loading ? <LoadingIndicator></LoadingIndicator>
                    : !loading && query === '' && products.length === 0 ? <EmptyIndicator></EmptyIndicator>
                    : !loading && query !== '' && products.length === 0 ? <EmptySearchResult></EmptySearchResult>
                    : !loading && products.length > 0 ? <div className="products-section">
                        {
                            products.map((product) => {
                                const { id, name, Category, ProductGalleries } = product;
                                
                                return(
                                    <div className='card'>
                                        <div className='card-body'>
                                            <img 
                                                src={
                                                    ProductGalleries.length === 0 ? 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
                                                        : ProductGalleries[0].name
                                                }
                                                className="card-img-top"
                                            />
                                            <div className="card-title mt-1">
                                                <div className="card-title-item">
                                                    <h6>{name}</h6>
                                                </div>
                                            </div>
                                            <div className="category-section">
                                                <div className="category-item">
                                                    <Link>
                                                        <MdVisibility
                                                            className="mx-2"
                                                            size={20}
                                                            color="#ADFF2F"
                                                        />
                                                    </Link>
                                                    <Link>
                                                        <MdModeEditOutline
                                                            size={20}
                                                        />
                                                    </Link>
                                                    <Link>
                                                        <MdDelete
                                                            onClick={() => deleteProduct(id)}
                                                            className="ms-2 me-0"
                                                            color="#FF0000" 
                                                            size={20}
                                                        />
                                                    </Link>
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