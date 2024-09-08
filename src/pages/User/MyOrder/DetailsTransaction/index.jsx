import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { useAddToCartMutation } from '../../../../features/cart/apiCarts';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DetailsTransaction = ({ onClose, checkoutDetails, products }) => {
  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

  // Calculate total product weight
  const totalProductWeight = products.reduce(
    (total, product) => total + product.quantity * product.product.weight,
    0
  );

  const [showAllProducts, setShowAllProducts] = useState(false);

  // Check if there are more than one product
  const shouldShowAllProductsButton = products.length > 1;

  // Render only the first product or all products based on the state
  const displayedProducts = showAllProducts ? products : [products[0]];



  const [addToCart] = useAddToCartMutation()

  const handleBuyBack = () => {
    addToCart()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChatAdmin = () => {
    // Replace 'your_whatsapp_number' with the actual WhatsApp number you want to chat with
    const whatsappNumber = '+6289639539018';

    // Create the WhatsApp URL with a predefined message
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=Hello%20Admin,%20I%20have%20a%20question%20about%20my%20order.`;

    // Attempt to open the WhatsApp app
    window.open(whatsappUrl, '_blank');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalPriceAfterPPN = products.reduce((total, product) => total + product.quantity * product.product.unitPrice, 0)
  const totalPriceBeforePPN = Math.ceil(products.reduce((total, product) => total + product.quantity * product.product.unitPrice, 0) / (1 + 0.11))
  const totalPPN = formatCurrency(totalPriceAfterPPN - totalPriceBeforePPN)
  const shoppingDiscounts = checkoutDetails.voucherCode === null ? '-' : `-${formatCurrency(((products.reduce((total, product) => total + product.quantity * product.product.unitPrice, 0) * 6) / 100).toFixed(2))}`
  const pickUpInStoreFee = checkoutDetails.isPickUpInStore === false ? '-' : formatCurrency(products.reduce((total, product) => total + product.quantity * product.product.unitPrice, 0) * 0.11)
  const totalShippingCost = checkoutDetails.shippingCost === null ? '-' : formatCurrency(checkoutDetails.shippingCost)
  const paymentMethod = checkoutDetails.paymentMethod === null ? '-' : checkoutDetails.paymentMethod.toUpperCase()
  const countProductsById = (productId) => {
    return products.reduce((total, product) => {
      // Check if the current product has the same ID
      if (product.product.id === productId) {
        return total + product.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Detail Transaksi</h3>
        <NormalHR />
        <LeftSection>


          <p><b>{checkoutDetails.deliveryStatus}</b></p>
          <Link style={{ textDecorationLine: 'none', color: '#000080' }} to={`${checkoutDetails.id}`}>
            <p><GrayText>No. Invoice</GrayText> <BlackText style={{ color: 'darkblue' }}><b> {checkoutDetails.midtransCode}</b></BlackText></p>
          </Link>
          <p><GrayText>Tanggal Pembelian</GrayText> <BlackText>{new Date(checkoutDetails.createdAt).toLocaleString('id-ID')} WIB</BlackText></p>
          <ThickHR />
          {/* Render product details */}
          <h4>Detail Produk</h4>

          {displayedProducts.map((product, index) => (
            <ProductContainer key={index}>
              <ProductInfo>
                <ProductImage src={product.product.image} alt={`Gambar dari ${product.product.name}`} />
                <ProductNameAndUnitPrice>
                  <h5>{product.product.name}</h5>
                  <p><GrayText>{countProductsById(product.product.id)} x {formatCurrency(product.product.unitPrice)}</GrayText></p>
                </ProductNameAndUnitPrice>
                <VerticalLine />
                <TotalPrice>
                  <p>Total Harga</p>
                  <p style={{ fontWeight: 'bold' }}>{formatCurrency(countProductsById(product.product.id) * (product.product.unitPrice))}</p>
                </TotalPrice>
                <BuyBackBtn onClick={handleBuyBack} disabled={product.product.stock === 0} >Beli Lagi</BuyBackBtn>
              </ProductInfo>
            </ProductContainer>
          ))}
          {/* Show "See All Products" button if there are more than one product */}
          {shouldShowAllProductsButton && (
            <p
              className='button'
              style={{ backgroundColor: '#fff', color: '#000080' }}
              onClick={() => setShowAllProducts(!showAllProducts)}
            >
              <b>{showAllProducts ? 'Lihat Lebih Sedikit' : 'Lihat Semua Produk'}</b>
              <FontAwesomeIcon icon={showAllProducts ? faAngleUp : faAngleDown} style={{ marginLeft: '5px' }} />
            </p>
          )}
          <ThickHR />
          {/* Add more details as needed */}
          <ShippmentInfo>
            <h3>Info Pengiriman</h3>
            <div>
              {checkoutDetails.isPickUpInStore === false ? (
                <div>
                  <p>
                    <GrayText>Kurir</GrayText>
                    <BlackText style={{ width: '80%' }}>
                      <GrayText>:     </GrayText>{checkoutDetails.shippingMethod === null ? '-' : checkoutDetails.shippingMethod.toUpperCase()}
                    </BlackText>
                  </p>
                  <p>
                    <GrayText>No Resi</GrayText>
                    <BlackText style={{ width: '80%' }}>
                      <GrayText>:     </GrayText>{checkoutDetails.trackingNumber === null ? '-' : checkoutDetails.trackingNumber}
                    </BlackText>
                  </p>
                  <p>
                    <GrayText>Alamat</GrayText>
                    <BlackText style={{ width: '80%', marginBottom: '5%' }}>
                      <GrayText>:     </GrayText>{checkoutDetails.shippingAddress}
                    </BlackText>
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    <GrayText>Lokasi Toko</GrayText>
                    <BlackText style={{ width: '80%' }}>
                      <GrayText>:     </GrayText><Link style={{ textDecorationLine: 'none' }} to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('GCP3+6W Tampan, Kota Pekanbaru, Riau')}`} target="_blank">Lihat di Google Maps</Link>
                    </BlackText>
                  </p>
                  <p>
                    <i> Biaya layanan Ambil di Toko dikenakan 11%</i>
                  </p>
                </div>
              )}
            </div>
          </ShippmentInfo>
          <ThickHR />
          <h4>Rincian Pembayaran</h4>
          <p><GrayText>Metode Pembayaran</GrayText> <BlackText>{paymentMethod}</BlackText></p>
          <p><GrayText>Total Harga <i>belum termasuk PPN </i>({totalQuantity} barang)</GrayText> <BlackText> {formatCurrency(totalPriceBeforePPN)}</BlackText></p>
          <p><GrayText>Total PPN 11% ({totalQuantity} barang) </GrayText> <BlackText>{totalPPN}</BlackText></p>
          <p><GrayText>Total Ongkos Kirim ({totalProductWeight} gr) </GrayText> <BlackText>{totalShippingCost}</BlackText></p>
          <p><GrayText>Diskon Belanja (6%)</GrayText> <BlackText> {shoppingDiscounts}</BlackText></p>
          <p><GrayText>Biaya Ambil di Toko (11%)</GrayText> <BlackText>{pickUpInStoreFee}</BlackText> </p>
          <p><GrayText>Total Harga <i>sudah termasuk PPN </i>({totalQuantity} barang)</GrayText> <BlackText> {formatCurrency(totalPriceAfterPPN)} </BlackText></p>
          <p><b>Total Belanja<BlackText> {formatCurrency(checkoutDetails.totalPrice)}</BlackText></b></p>
          <ThickHR />
          <ModalCloseButton onClick={onClose}>
            &times;
          </ModalCloseButton>
        </LeftSection>
        <RightSection>
          <ButtonRightSection>
            <LeaveReviewBtn>Beri Ulasan</LeaveReviewBtn>
            <WhiteButton>Chat Admin</WhiteButton>
            <WhiteButton>Bantuan</WhiteButton>
          </ButtonRightSection>
        </RightSection>
      </ModalContent >
    </ModalOverlay >
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  padding-top: 50px;
  top: 0;
  left: 0;
  width: 100%;
  height: 95%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-height: 80%;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  border: none;
  background: none;
`;

const DetailsTransactionContent = styled.div`
width: 100%;
`

const ProductContainer = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  margin-right: 10px;
`;
const NormalHR = styled.hr`
  border: 1px solid #ddd;
  width: 98%;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  @media screen and (max-width: 768px) {
  display: flex;
  }
`;



const ProductImage = styled.img`
  width: 80px;
  margin-left: 10px;
`;

const ProductNameAndUnitPrice = styled.div`
  width: 50%;
  margin-left: 10px;
  margin-bottom: 10px;
`

const TotalPrice = styled.div`
margin-top: 10px; /* Add margin at the top for separation */
margin-left: 20px;
@media screen and (max-width: 768px) {
  flex-direction: row ; /* Change direction to column for mobile view */
  margin-top: 0px; /* Adjust top margin to save space */
  margin-left: 0px; /* Adjust left margin to save space */
  p{
    margin: 5px;
  }
}
`;
// const TotalPrice = styled.div`
//   display: flex-end;
//   margin-right: 5%;
//   @media (min-width: 768px) {
//     display: flex-end;
//   margin-right: 5%;
//   }
// `;

const VerticalLine = styled.div`
border-left: 1px solid #ddd;
height: 100px; /* Set the height as needed */
margin-left: auto; /* Push the VerticalLine to the right */
margin-right: 10px; /* Add additional margin if needed */
@media screen and (max-width: 768px) {
  display: none;
}
`;

const ShippmentInfo = styled.div`
  margin-bottom: 5%;
`;

const ThickHR = styled.hr`
  border: 3px solid #ddd;
  width: 98%;
  margin: 0px;

`;

const GrayText = styled.span`
  color: gray;
`;

const BlackText = styled.span`
  color: black;
  float: right;
  padding-right: 0px;
  @media (min-width: 768px) {
  padding-right: 10px;
  }
`
const LeftSection = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 54vh;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }

  p {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    width: 80%;
    float: left;
  }
`;

const RightSection = styled.div`
  width: 100%;
  float: none;

  @media (min-width: 768px) {
    width: 20%;
    float: left;
  }
`;

const ButtonRightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const LeaveReviewBtn = styled.div`
  background-color: darkblue;
  color: white;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
  width: 60%;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  
`;

const WhiteButton = styled.button`
  font-weight: bold;
  background-color: white;
  color: darkslategray;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
  width: 65%;
  text-align: center;
  font-size: 14px;
  @media (min-width: 768px) {
    width: 70%;
  }
`;

const BuyBackBtn = styled.button`
font-weight: bold;
background-color: white;
color: darkblue;
border-radius: 10px;
border: 1px solid darkblue;
padding: 10px;
margin: 5px;
width: 20%;
text-align: center;
font-size: 14px;
@media (max-width: 768px) {
  width: 100%; // Set the width to 100% for mobile view
}
`;
// const BuyBackBtn = styled.button`
// font-weight: bold;
// background-color: white;
// color: darkblue;
// border-radius: 10px;
// border: 1px solid darkblue;
// padding: 10px;
// margin: 5px;
// width: 60%;
// text-align: center;
// font-size: 14px;
// @media (max-width: 768px) {
//   width: 100%; // Set the width to 100% for mobile view
// }
// `;

export default DetailsTransaction;
