import React from "react";
import styled from "styled-components";

// Styled components for kodeVouc and contentVouc
const KodeVoucHeading = styled.h3`
  font-size: 16px;
  padding-top: 3%;
  color: #333;
  margin-bottom: 10px;
`;

const ContentVoucParagraph = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const VoucherContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoucherInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ApplyButton = styled.button`
  background-color: darkblue;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function UseVouchers({ voucherCode, setVoucherCode, applyVoucher }) {
  return (
    <div>
      {/* Use the styled components for heading and paragraph */}
      <KodeVoucHeading>Pilih Kode Voucher</KodeVoucHeading>
      <ContentVoucParagraph>
        Silahkan pilih kode voucher di bawah untuk mendapatkan potongan belanja 6%!
      </ContentVoucParagraph>
      <VoucherContainer>
        <InputContainer>
          <VoucherInput
            type="voucher"
            placeholder="Masukkan kode voucher"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <ApplyButton onClick={applyVoucher}>Terapkan</ApplyButton>
        </InputContainer>
      </VoucherContainer>
    </div>
  );
}

export default UseVouchers;
