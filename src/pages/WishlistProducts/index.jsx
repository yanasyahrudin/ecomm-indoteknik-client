import React, { useState } from "react";
import {
  useGetWishlistsQuery,
  useRemoveWishlistMutation,
} from "../../features/wishlist/apiWishlist";
import { Link } from "react-router-dom";
import "./wishlist.css";
import styled from "styled-components";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Wishlist() {
  // Menggunakan hook useGetWishlistsQuery untuk mengambil daftar wishlist dari API
  const { data: wishlists, isError, isLoading } = useGetWishlistsQuery();
  const [removeWishlist] = useRemoveWishlistMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  // Inside your component, after importing other hooks
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <div>Sedang memuat...</div>;
  }

  if (isError) {
    return <div>Terjadi kesalahan saat mengambil data wishlist.</div>;
  }

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      setSelectedWishlist(wishlistId);
      setShowModal(true);
    } catch (error) {
      console.error("Error removing item from wishlist", error);
    }
  };

  const handleConfirmRemove = async () => {
    try {
      await removeWishlist(selectedWishlist);
      setShowModal(false);
    } catch (error) {
      console.error("Error removing item from wishlist", error);
    }
  };

  const handleCancelRemove = () => {
    setShowModal(false);
  };

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page in the browsing history
  };

  return (
    <>
      <WishlistContainer>
        <ButtonBack onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </ButtonBack>
        <h2>Produk Wishlist</h2>
        <CardGridContainers>
          {wishlists.map((wishlist) => (
            <Card key={wishlist.id}>
              <Link
                to={`${wishlist.product.id}`}
                style={{ textDecoration: "none" }}
              >
                <br />
                <CardImage
                  src={wishlist.product.image}
                  alt={wishlist.product.name}
                />
                <CardContent>
                  <Title>{wishlist.product.name.split(" ").slice(0, 6).join(" ")}...</Title>
                  <Price>{formatCurrency(wishlist.product.unitPrice)}</Price>
                </CardContent>
              </Link>
              <CartButton>
                {/* <AddToCartBtn >
                  <FontAwesomeIcon icon={faCartPlus} />
                </AddToCartBtn> */}
                <RemoveButton
                  onClick={() => handleRemoveFromWishlist(wishlist.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </RemoveButton>
              </CartButton>
            </Card>
          ))}
        </CardGridContainers>
        <ModalOverlay show={showModal}>
          <Modal>
            <p>Apakah Anda yakin ingin menghapus produk dari wishlist?</p>
            <Button style={{ backgroundColor: 'white', color: 'darkblue', border: '1px solid darkblue' }} onClick={handleConfirmRemove}>Ya</Button>
            <Button style={{ backgroundColor: 'darkblue', color: 'white', border: '1px solid white' }} onClick={handleCancelRemove}>Batal</Button>
          </Modal>
        </ModalOverlay>
      </WishlistContainer>
    </>
  );
}

export default Wishlist;

const CartButton = styled.div`
display: flex;
justify-content: center;
gap: 10px;
`

const ModalOverlay = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box-shadow for a subtle shadow effect */
  @media (max-width: 768px) {
    margin: 0;
    width: 50%;
  }
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;


const CardGridContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-decoration: none;
  @media (max-width: 768px) {
      display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
    padding: 0;
  }
`;

const Card = styled.div`
  // padding: 0 10px 19px 10px;
  // max-height: 282px;
  height: auto;
  width: auto;
  box-shadow: none;
  @media (max-width: 768px) {
    margin-top: -10px;
    padding: 0;
  }
`;

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 5px 5px 0 0;
  @media (max-width: 768px) {
    margin: 0;
    width: auto;
  }
`;

const CardContent = styled.div`
  padding: 10px 10px 19px 10px;
  @media (max-width: 768px) {
    margin: 0;
    width: auto;
  }
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  padding-bottom: 7px;
  color: black;
`;

const Price = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  padding-top: 2px;
  color: black;
`;
const WishlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding-top: 60px;
  padding-left: 20px;
  @media (max-width: 768px) {
      padding-top: 60px;
      width: 90%
  }
`;

const ButtonBack = styled.button`
display: none;
@media (max-width: 768px) {
  width: 10%;
  display: block;
  background-color: darkblue;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
`
const RemoveButton = styled.button`
display: none;
width: 20%;
  display: block;
  background-color: white;
  color: black;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ddd;
@media (max-width: 768px) {
  width: 20%;
  display: block;
  border-radius: 5px;
  padding: 10px;
}
`;

const AddToCartBtn = styled.button`
display: none;
width: 20%;
  display: block;
  background-color: white;
  color: black;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ddd;
@media (max-width: 768px) {
  width: 20%;
  display: block;
  border-radius: 5px;
  padding: 10px;
}
`;