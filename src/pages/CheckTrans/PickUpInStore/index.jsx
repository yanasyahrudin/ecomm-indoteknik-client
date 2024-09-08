// PickUpInStore.js

import React from 'react';
import './PickUpInStore.css';  // Import your CSS file for styling

function PickUpInStore({
  isPickupInStore,
  handlePickupInStoreChange,
  handleShippingMethodChange
}) {
  return (
    <div className="PickUpInStoreContainer">
      <h4>Pilih opsi pengiriman</h4>
      <div className="deliveryOptions">
        <div>
          <label>
            <input
              type="checkbox"
              name="pickupInStore"
              checked={isPickupInStore}
              onChange={handlePickupInStoreChange}
            />
            <span className="checkboxLabel">Ambil di Toko</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="ShippingMethod"
              checked={!isPickupInStore}
              onChange={handleShippingMethodChange}
            />
            <span className="checkboxLabel">Pengiriman Ekspedisi</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PickUpInStore;
