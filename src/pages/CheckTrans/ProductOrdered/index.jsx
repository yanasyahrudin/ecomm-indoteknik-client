import React from "react";
import { Link } from "react-router-dom";
import './index.css'

function ProductOrdered({ carts, handlerRemove, calculateAfterPPN, calculateVoucher, calculateTotal, isPickupInStore, calculateBeforePPN, totalShippingCost }) {
    function calculatePickupInStore() {
        if (isPickupInStore) {
            const pickupInStoreFee = calculateAfterPPN() * 0.11;
            return pickupInStoreFee;
        }
        return 0;
    }

    {/* Menggunakan fungsi truncateDescription untuk memotong deskripsi */ }
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };

    return (
        <div>
            <div className="cart-container">
                {carts?.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty</p>
                        <div className="start-shopping">
                            <Link to="/productlist">
                                <span>&lt;</span>
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>

                        <div className="titles">
                            <h3 className="product-title">Product</h3>
                            <h3 className="price">Price</h3>
                            <h3 className="quantity">Quantity</h3>
                            <h3 className="total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {carts?.map((e) => (
                                <div className="cart-item" key={e.id}>
                                    <div className="cart-product">
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
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">
                                        Rp.{e.product.unitPrice}
                                    </div>
                                    <div className="cart-product-quantity">
                                        <button disabled>-</button>
                                        <div className="count">{e.quantity}</div>
                                        <button disabled>+</button>
                                    </div>
                                    <div className="cart-product-total-price">
                                        Rp.{e.quantity * e.product.unitPrice}
                                    </div>
                                </div>
                            ))}
                        </div>


                        
                        
                        <div className="cart-summary">
                            
                            <p>
                                
                            </p>
                            <div className="cart-checkout" style={{ lineHeight: "30px" }}>
                                <div className="subtotal">
                                    <span>Total Harga <i>(Belum termasuk PPN)</i>: </span>
                                    <span className="amount">Rp.{calculateBeforePPN()}</span>
                                </div>
                                <div className="subtotal">
                                    <span>Total PPN <i>(11%)</i>:</span>
                                    <span className="amount">Rp.{calculateAfterPPN() - calculateBeforePPN()}</span>
                                </div>
                                <div className="subtotal">
                                    <span>Voucher: </span>
                                    <span className="amount">Rp.{calculateVoucher()}</span>
                                </div>
                                {!isPickupInStore ? (
                                    <div className="subtotal">
                                        <span>Total Ongkos Kirim:</span>
                                        <span className="amount">Rp.{totalShippingCost}</span>
                                    </div>
                                ) : (
                                    <div className="subtotal">
                                        <span>Ambil di Toko:</span>
                                        <span className="amount">Rp.{calculatePickupInStore()}</span>
                                    </div>
                                )}
                                <div className="subtotal">
                                    <span>Total Harga <i>(Sudah termasuk PPN)</i>: </span>
                                    <span className="amount">Rp.{calculateAfterPPN()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductOrdered;
