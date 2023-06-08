import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../axios/sellerAxios";
import './components.css';
import logo from '../assets/shopaholic_seller_logo.png';
import { baseApiUrl } from "../helpers/commonVariables";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar = (props) => {
    const { loginCbHandler, seller, loading } = props;
    const navigation = useNavigate();

    const logoutHandler = () => {
        logout(loginCbHandler);
    }

    return(
        <>
            <div className="navbar navbar-expand-lg shadow-sm py-3">
                <div className="navbar-item">
                    <img src={logo} className="navbar-logo" alt="#"></img>
                </div>
                { !loading ? <div className="navbar-item">
                    <li className="dropdown">
                        <Link
                            className='navlink active p-0'
                            role='button'
                            id='dropdownMenuLink'
                            data-bs-hover='dropdown'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                        >
                           <img 
                                src={
                                    seller.profile_picture === null 
                                        ? "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                        : `${baseApiUrl}${seller.profile_picture}`
                                }
                                width={42}
                                className="profile-image rounded-circle"
                                alt="img"
                           />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-bg-color">
                            <li className="dropdown-item">
                                <h5>{ seller.name }</h5>
                                <h7>{ seller.email }</h7>
                            </li>
                            <hr className="mx-2 mt-1 mb-2" />
                            <li>
                                <Link
                                    className="logout-text dropdown-item dropdown-custom"
                                    onClick={() => logoutHandler()}
                                    to='/'
                                >
                                    <FiLogOut 
                                        className="me-1 mb-1 ms-0"
                                        size={20}
                                    />
                                    Log Out
                                </Link>
                            </li>
                        </ul>
                    </li>
                </div> : <></> }
            </div>
        </>
    );
}

export default Navbar;