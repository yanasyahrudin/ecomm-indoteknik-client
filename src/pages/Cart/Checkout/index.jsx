import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaShoppingCart } from "react-icons/fa"; // Menggunakan react-icons/fa5 untuk ikon dari Font Awesome 5
import {
    useRemoveItemFromCartMutation,
    useIncrementCartItemMutation,
    useDecrementCartItemMutation,
} from "../../../features/cart/apiCarts";
import './itCart.css'
import Back from '../../../assets/back-button.png'

function Checkout({ carts }) {
    const isCheckoutDisabled = carts?.some((cartItem) => cartItem.product.stock <= 0);
    const [removeItemFromCart] = useRemoveItemFromCartMutation()
    const [incrementCartItem] = useIncrementCartItemMutation()
    const [decrementCartItem] = useDecrementCartItemMutation()

    const handlerInc = (id) => {
        incrementCartItem(id)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handlerDec = (id) => {
        decrementCartItem(id)
    };

    const handlerRemove = (id) => {
        removeItemFromCart(id)
    };

    const calculateTotal = () => {
        return carts?.reduce((total, cartItem) => {
            const productPrice = cartItem.product.unitPrice;
            const quantity = cartItem.quantity;
            return total + productPrice * quantity;
        }, 0);
    };

    {/* Menggunakan fungsi truncateDescription untuk memotong deskripsi */ }
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };
    const truncateName = (name, maxLength) => {
        if (name.length > maxLength) {
            return `${name.slice(0, maxLength)}...`;
        }
        return name;
    };

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page in the browsing history
    };

    return (

        <div
            className="cart-container"
            style={{ position: "relative", top: "50px" }}
        >
            
            <button className="button button-back" style={{backgroundColor: 'darkblue'}} onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <h3>Keranjang Belanja</h3>
            <div>

                <div className="titles">
                    <h3 className="product-title">Produk</h3>
                    <h3 className="price">Harga</h3>
                    <h3 className="quantity">Kuantitas</h3>
                    <h3 className="total">Total Harga</h3>
                </div>
                <div class="cart-items">
                    {carts?.map((e) => (
                        <div class="cart-item">
                            <div class="cart-product">
                                <Link to={`/products/${e.product.id}`}>
                                    <img
                                        src={e.product.image}
                                        alt={e.product.name}
                                    />
                                </Link>
                                <div>
                                    <h3>{e.product.name}</h3>
                                    {/* Menampilkan deskripsi yang dipotong dengan memanggil truncateDescription */}
                                    {/* <p>{truncateDescription(e.product.description, 100)}</p> */}
                                    <button onClick={() => handlerRemove(e.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Hapus
                                    </button>
                                </div>
                            </div>
                            <div className="cart-product-price">
                                Rp.{e.product.unitPrice}
                            </div>
                            <div className="cart-product-quantity">
                                <button onClick={() => handlerDec(e.id)}>
                                    -
                                </button>
                                <div className="count">{e.quantity}</div>
                                <button onClick={() => handlerInc(e.id)}>
                                    +
                                </button>
                            </div>
                            <div className="cart-product-total-price">
                                Rp.{e.quantity * e.product.unitPrice}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <p></p>
                    <div className="cart-checkout">
                        <div className="subtotal">
                            <span>Total Harga (Sudah termasuk PPN) :</span>
                            <span className="amount">
                                Rp.{calculateTotal()}
                            </span>
                        </div>
                        <p><i>Biaya PPN dikenakan 11%</i></p>
                        <button
                            style={checkoutButtonStyle}
                            disabled={isCheckoutDisabled} // Disable the button if any product is out of stock
                        >
                            <Link to="/pay-now" style={linkStyle}>

                                {!isCheckoutDisabled ? 'Checkout' : 'Stok produk kosong'}
                            </Link>
                        </button>
                        <ContinueShoppingContainer>
                            <ContinueShoppingIcon>&lt;</ContinueShoppingIcon>
                            <Link to="/productlist">Beli Lagi</Link>
                        </ContinueShoppingContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout

const StoreHeader = styled.div`
  max-width: 900px;
  // background: #ddefef;
  // padding: 10px 76% 10px 5px;
`;

const StoreImage = styled.img`
  max-width: 230px;
`;

const checkoutButtonStyle = {
    backgroundColor: "darkblue",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
};

const linkStyle = {
    color: "white",
    textDecoration: "none",
};

const ContinueShoppingButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none; /* Set text-decoration to none to remove the underline */

  &:hover {
    background-color: #0056b3;
  }
`;

const ContinueShoppingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  text-decoration: none; /* Set text-decoration to none to remove the underline */

  &:hover {
    color: #007bff;
  }
`;

const ContinueShoppingIcon = styled(FaShoppingCart)`
  margin-right: 8px;
  font-size: 18px;
`;
