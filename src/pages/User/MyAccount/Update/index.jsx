import React from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Coin from '../../../../assets/coin.png'

function UpdateProfile({
  handleSubmit,
  previewImage,
  handleImageChange,
  fullName,
  setFullName,
  userData,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  isEditing,
}) {

  return (
    <div>
      <ProfileHeader>
        <ProfileTitle>Profil Saya</ProfileTitle>
        <ProfilePictureMobile>
          <img src={userData?.imageProfile} alt={userData?.fullName} width='100' />
        </ProfilePictureMobile>
        <PuchasePointsMobile>
          {/* <FontAwesomeIcon icon={faCoins} style={{ marginRight: '5px' }} /> */}
          <img src={Coin} alt="Coin" width='20px'/>
          <p>{userData?.purchasePoints}</p>
        </PuchasePointsMobile>
        <ProfileDescription>
          Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun
        </ProfileDescription>
      </ProfileHeader>
      <Form onSubmit={handleSubmit}>
        <TitleForm>Update Profile</TitleForm>
        <Label>Profile Image</Label>
        {previewImage && <img src={previewImage} alt="Preview" width='200' />}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Label>Nama Lengkap</Label>
        <Input
          name="namaLengkap"
          type="tel"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Label>Email</Label>
        <Input name="email" type="email" value={userData?.email} readOnly />

        <Label>No.Hp</Label>
        <Input
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Label>Alamat</Label>
        <TextArea
          name="address"
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button type="submit" disabled={isEditing}>
          {isEditing ? "Updating..." : "Update Profile"}
        </Button>
      </Form>
    </div>
  )
}

export default UpdateProfile

const ProfilePictureMobile = styled.div`
display: none;
@media (max-width: 768px) {
  display: flex;
  margin: 15px 15px 0px 10px;
  justify-content: center;
  padding: 0px;
  width: auto;
  height: auto;
  
}
`

const ProfileHeader = styled.div`
  background-color: lightblue;
  padding: 3px 0;
  margin: 70px 15px 20px 340px;
  border-radius: 10px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: 60px 15px 20px 15px;
    padding: 0px;
    width: auto;
    height: auto;
    border-radius: 10px;
  }
`;

const ProfileTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-left: 5%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileDescription = styled.p`
  font-size: 14px;
  padding-left: 5%;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
    height: auto;
    text-align: center; /* Center the text when in mobile mode */
    padding-left: 0;   /* Remove left padding in mobile mode */
  }
`;


const Button = styled.button`
  padding: 10px 20px;
  background-color: #000080;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #007bff;
  }
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
  @media (max-width: 768px) {
    width: auto;
  }
  
`;


const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const TitleForm = styled.h3`
  display: none;
  @media (max-width: 768px) {
    display: none;
    font-size: 20px;
    padding-bottom: 5px;
  }
`;

const Form = styled.form`
  padding-left: 29%;
  width: auto;
  padding-right: 60px;
  margin-bottom: 30px;
  margin-top: 10px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: -100px 15px 40px 15px;
    padding: 0;
    padding-top: 100px;
    width: auto;
    height: auto;
  }
`;

const PuchasePointsMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    padding-left: 37%;
    padding-top: 5%;
    img {
      padding: 10px;
    }
    p{
      font-weight: bold;
    }
  }
`;