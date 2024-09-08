import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../navbar/iconCart.png";


export function Sidebar({ closeSidebar }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsDropdownOpen(false);
        // Add any other actions you want to perform on logout
    };

    return (
        <div className="sidebar">

            <ul>
                <li>
                    <Link to="/productlist">Semua Produk</Link>
                </li>
                <li>
                    <Link to="/about-us">Tentang Kami</Link>
                </li>
                <hr />
                {localStorage.getItem('access_token') && (
                    <>
                        <li
                            style={{
                                display: "flex",
                                padding: "10px 13px",
                                margin: "0",
                                alignContent: "center",
                                alignItems: "start",
                                color: "gray",
                            }}
                        >
                            <i style={{ marginLeft: "3px" }} className="fas fa-user" />{" "}
                            <Link
                                style={{ display: "flex", marginLeft: "12px" }}
                                to="/user/my-account"
                            >
                                Akun Saya
                            </Link>
                        </li>
                        <li
                            style={{
                                display: "flex",
                                padding: "10px 13px",
                                margin: "0",
                                alignContent: "center",
                                alignItems: "center",
                                color: "gray",
                            }}
                        >
                            <i className="fas fa-shopping-cart" />{" "}
                            <Link
                                style={{ display: "flex", marginLeft: "10px" }}
                                to="user/my-order"
                            >
                                Pesanan Saya
                            </Link>
                        </li>
                        <li
                            style={{
                                display: "flex",
                                padding: "10px 13px",
                                margin: "0",
                                alignContent: "center",
                                alignItems: "center",
                                color: "gray",
                            }}
                        >
                            <i className="fas fa-heart" />{" "}
                            <Link
                                style={{ display: "flex", marginLeft: "10px" }}
                                to="wishlist-products"
                            >
                                Wishlist
                            </Link>
                        </li>
                        <li
                            style={{
                                display: "flex",
                                padding: "10px 13px",
                                margin: "0",
                                alignContent: "center",
                                alignItems: "center",
                                color: "gray",
                            }}
                        >
                            <i
                                style={{ marginLeft: "2px" }}
                                className="fas fa-sign-out-alt"
                            />{" "}
                            <Link
                                style={{ display: "flex", marginLeft: "11.2px" }}
                                onClick={handleLogout}
                                to='/login'
                            >
                                Keluar
                            </Link>
                        </li>
                    </>
                )}
                {!localStorage.getItem('access_token') && (
                    <>
                        <li>
                            <Link to="/login">Masuk</Link>
                        </li>
                    </>
                )}
            </ul>

            <button className="close-sidebar" onClick={closeSidebar}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}