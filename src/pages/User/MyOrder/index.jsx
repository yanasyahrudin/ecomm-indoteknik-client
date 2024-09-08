import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './myOrder.css';
import DetailsTransaction from './DetailsTransaction';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useEditCheckoutMutation } from '../../../features/checkout/apiCheckouts';

function MyOrder() {
  const [checkoutProducts, setCheckoutProducts] = useState({});
  const [activeTab, setActiveTab] = useState('Semua'); // Default active tab is 'Semua'
  const [searchQuery, setSearchQuery] = useState('');
  // State to manage detailed transaction modal visibility and data
  const [isDetailsTransaction, setDetailsTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  // Use the editCheckout mutation
  const [editCheckout, { isLoading: isEditingCheckout }] = useEditCheckoutMutation();

  // Function to handle the change in delivery status
  const handleDeliveryStatusChange = (checkoutId) => {
    // Set the new delivery status
    const newDeliveryStatus = 'Pesanan diterima';

    // Make the mutation using the editCheckout function
    editCheckout({ id: checkoutId, deliveryStatus: newDeliveryStatus })
      .unwrap() // Extract the result from the returned object
      .then((result) => {
        console.log('Checkout updated successfully:', result);
        // Add any additional logic or state updates if needed
      })
      .catch((error) => {
        console.error('Error updating checkout:', error);
        // Handle the error, show a message, etc.
      });
  };

  // Function to open details transaction modal
  const openDetailsTransaction = (checkout, products) => {
    setSelectedTransaction(checkout);
    setSelectedProducts(products);
    setDetailsTransaction(true);
  };

  const closeDetailsTransaction = () => {
    setDetailsTransaction(false);
  };


  useEffect(() => {
    fetch('http://localhost:3100/checkout-products',
      {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => response.json())
      .then(data => setCheckoutProducts(data))
      .catch(error => console.error(error));
  }, []);

  // Filter the checkoutProducts based on the activeTab
  const filteredCheckoutProducts = Object.keys(checkoutProducts).reduce((result, checkoutId) => {
    const checkout = checkoutProducts[checkoutId][0]?.checkout;
    const products = checkoutProducts[checkoutId].filter((productInfo) =>
      productInfo.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if ((activeTab === 'Semua' || checkout?.deliveryStatus === activeTab) && products.length > 0) {
      result[checkoutId] = products;
    }

    return result;
  }, {});

  const countProductsById = (products, productId) => {
    return products.filter(productInfo => productInfo.product.id === productId).length;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'left', marginLeft: '300px', marginTop: '90px' }}>Pesanan Saya</h2>

      {/* Responsive title for mobile view */}
      <MobileTitle>Pesanan Saya</MobileTitle>

      <TabsSearchContainer>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Cari produk transaksimu di sini"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tabs">
          <div style={{ fontSize: 'large', padding: '5px' }}>
            <b>Status</b>
          </div>
          <button
            onClick={() => setActiveTab('Semua')}
            className={`tab-button ${activeTab === 'Semua' ? 'active' : ''}`}
          >
            Semua
          </button>
          <button
            onClick={() => setActiveTab('Sedang dikemas')}
            className={`tab-button ${activeTab === 'Sedang dikemas' ? 'active' : ''}`}
          >
            Sedang dikemas
          </button>
          <button
            onClick={() => setActiveTab('Dikirim')}
            className={`tab-button ${activeTab === 'Dikirim' ? 'active' : ''}`}
          >
            Dikirim
          </button>
          <button
            onClick={() => setActiveTab('Pesanan diterima')}
            className={`tab-button ${activeTab === 'Pesanan diterima' ? 'active' : ''}`}
          >
            Selesai
          </button>
        </div>
      </TabsSearchContainer>
      {
        Object.keys(filteredCheckoutProducts).length === 0 ? (
          <p className='checkout-table'>Tidak ada proses</p>
        ) : (
          Object.keys(filteredCheckoutProducts).map(checkoutId => (
            <div key={checkoutId} className="checkout-table">
              <HeaderConatiner>
                <FontAwesomeIcon icon={faBagShopping} />
                <Shop>
                  Belanja
                </Shop>
                <DateOrder>{new Date(filteredCheckoutProducts[checkoutId][0].checkout.createdAt).toLocaleDateString('id-ID')}</DateOrder>
                <DeliveryStatus>{filteredCheckoutProducts[checkoutId][0].checkout.deliveryStatus}</DeliveryStatus>
                <Invoice>{filteredCheckoutProducts[checkoutId][0].checkout.midtransCode}</Invoice>
              </HeaderConatiner>
              <BodyContainer>

                <ProductConatiner>
                  {filteredCheckoutProducts[checkoutId].slice(0, 1).map((productInfo, index) => (
                    <div key={index}>
                      <ProductInfo>
                        <ProductImage src={productInfo.product.image} alt={productInfo.product.name} />
                        <ProductDetails>
                          <h4>{productInfo.product.name.length > 50 ? `${productInfo.product.name.substring(0, 60)}...` : productInfo.product.name}</h4>
                          <p>{`${countProductsById(filteredCheckoutProducts[checkoutId], productInfo.product.id)} produk x ${formatCurrency(productInfo.product.unitPrice)}`}</p>
                          {filteredCheckoutProducts[checkoutId].length > 1 && (
                            <div>
                              <p onClick={() => openDetailsTransaction(filteredCheckoutProducts[checkoutId][0].checkout, filteredCheckoutProducts[checkoutId])}>
                                +1 Produk Lainnya
                              </p>
                            </div>
                          )}
                        </ProductDetails>
                      </ProductInfo>
                    </div>
                  ))}
                </ProductConatiner>
                <VerticalLine />
                <CheckoutTotalPrice>
                  <p style={{ color: 'grey' }}>Total Belanja</p>
                  <p style={{ fontWeight: 'bold' }}>{formatCurrency(filteredCheckoutProducts[checkoutId][0].checkout.totalPrice)} </p>
                </CheckoutTotalPrice>

              </BodyContainer>
              <FooterContainer>
                <ViewDetailsTransaction onClick={() => openDetailsTransaction(filteredCheckoutProducts[checkoutId][0].checkout, filteredCheckoutProducts[checkoutId])}>
                  <b>Lihat Detail Transaksi</b>
                </ViewDetailsTransaction>
                {filteredCheckoutProducts[checkoutId][0].checkout.deliveryStatus === 'Pesanan diterima' && (
                  <ReviewAndBuyBackButton>
                    <ReviewButton>Ulas</ReviewButton>
                    <BuyBackButton>Beli Lagi</BuyBackButton>
                  </ReviewAndBuyBackButton>
                )}
                {(filteredCheckoutProducts[checkoutId][0].checkout.deliveryStatus === 'Dikirim' ||
                  filteredCheckoutProducts[checkoutId][0].checkout.deliveryStatus === 'Menunggu pembeli') && (
                    <ReviewAndBuyBackButton>
                      <ConfirmButton onClick={() => handleDeliveryStatusChange(filteredCheckoutProducts[checkoutId][0].checkout.id)}
                        disabled={isEditingCheckout}>Konfirmasi Pesanan</ConfirmButton>
                    </ReviewAndBuyBackButton>
                  )}
              </FooterContainer>
              {/* DetailsTransaction */}
              {isDetailsTransaction && selectedTransaction && selectedProducts && (
                <DetailsTransaction onClose={() => setDetailsTransaction(false)} checkoutDetails={selectedTransaction} products={selectedProducts}>
                  {/* You can include additional content here if needed */}
                </DetailsTransaction>
              )}
              {/* Conditionally render buttons based on deliveryStatus */}

            </div>
          ))
        )
      }
    </div >
  );
}

const MobileTitle = styled.h2`
display: none;
@media screen and (max-width: 768px) {
    display: block;
    text-align: left;
    padding-left: 10px;
    padding-top: 60px;
    font-size: larger;
  
}
`
const TabsSearchContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
@media screen and (max-width: 768px) {
  flex-direction: column;
  align-items: flex-start;
}
`

const HeaderConatiner = styled.div`
  display: flex;
  justify-content: space-between; /* Add space between elements */
  margin-bottom: 10px; /* Optional: Add margin at the bottom */
  width: 60%;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100%;
  }
`;
const Invoice = styled.div`
color: grey;
@media screen and (max-width: 768px) {
  display: none;
}
`
const Shop = styled.div`
font-weight: bold;
@media screen and (max-width: 768px) {
  
}
`
const DeliveryStatus = styled.div`
font-weight: bold;
font-size : 12px;
background-color: lightblue;
padding: 5px;
border-radius: 5px;
color: darkblue;
`
const DateOrder = styled.div`

`

const ProductInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 60px;
    margin-right: 10px;
  }

  div {
    flex-grow: 1; /* Allow the text content to take remaining space */
  }

  h4 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px;
    color: grey;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    img {
      width: 50px;
      margin-bottom: 5px;
    }

    h4 {
      font-size: 12px;
    }

    p {
      font-size: 10px;
    }
  }
`;


const ProductConatiner = styled.div`
  display: flex;
  margin-bottom: 5px; /* Adjust margin-bottom for a more compact look */
  position: relative;
  justify-content: space-between;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column; /* Display items in a column for mobile view */
  @media screen and (min-width: 768px) {
    justify-content: flex-end; /* Align items to the bottom for larger screens */
    flex-direction: row; /* Change back to row for larger screens */
  }
`;

// Existing styled-components

const CheckoutTotalPrice = styled.div`
  margin-top: 10px; /* Add margin at the top for separation */
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row ; /* Change direction to column for mobile view */
    margin-top: 0px; /* Adjust top margin to save space */
    margin-left: 0px; /* Adjust left margin to save space */
    p{
      margin: 5px;
    }
  }
`;

const VerticalLine = styled.div`
  border-left: 1px solid #ddd;
  height: 100px; /* Set the height as needed */
  margin-left: auto; /* Push the VerticalLine to the right */
  margin-right: 10px; /* Add additional margin if needed */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column; /* Change the direction to column for mobile view */
  margin-bottom: 10px;
  position: relative;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    flex-direction: row; /* Change back to row for larger screens */
  }
`;

const ProductImage = styled.img`
  width: 80px;
  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;

const ViewDetailsTransaction = styled.p`
  color: darkblue;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    margin: 5px;
    margin-bottom: 5px;
  }
`;

const ReviewButton = styled.button`
background-color: white;
border-radius: 10px;
padding: 10px;
border: 1px solid darkblue;
color: darkblue;
margin: 10px;
font-weight: bold;
width: 100%;
@media screen and (max-width: 768px) {
 
}
`
const ConfirmButton = styled.button`
background-color: darkblue;
border-radius: 10px;
padding: 10px;
border: 1px solid darkblue;
color: white;
margin: 10px;
font-weight: bold;
width: 100%;
@media screen and (max-width: 768px) {
  width: 50%;
  margin-left: 25%;
}`

const BuyBackButton = styled.button`
background-color: darkblue;
border-radius: 10px;
padding: 10px;
border: 1px solid darkblue;
color: white;
margin: 10px;
font-weight: bold;
width: 100%;
@media screen and (max-width: 768px) {
  
}
`

const ReviewAndBuyBackButton = styled.div`
display: flex;
width: 30%;
@media screen and (max-width: 768px) {
  width: 100%;
}
`
const ProductDetails = styled.div`

`




export default MyOrder;