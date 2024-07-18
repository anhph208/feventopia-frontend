import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { PriceFormat } from "../utils/tools"; // Import the PriceFormat component
import { toast } from "react-toastify";

const RechargeModal = ({ show, handleClose, handleRecharge }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountValue = parseInt(amount, 10);

    // Validate the amount
    if (isNaN(amountValue) || amountValue < 10000 || amountValue > 999999999) {
      setError("Vui lòng nhập số tiền từ 10.000đ đến 999.999.999đ.");
      toast.error("Vui lòng nhập số tiền từ 10.000đ đến 999.999.999đ.");
      return;
    }

    handleRecharge(amountValue);
    setAmount(""); // Reset amount after submission
    setError(""); // Reset error after successful submission
    setTermsAccepted(false); // Reset terms accepted after submission
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value < 10000) {
      setError("Số tiền không được nhỏ hơn 10.000đ.");
    } else if (e.target.value > 999999999) {
      setError("Số tiền không được lớn hơn 999.999.999đ.");
    } else {
      setError("");
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Nạp tiền vào ví</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Số tiền"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            required
          />
          {amount && !error && (
            <Typography variant="body2">
              Số tiền nhập: <PriceFormat price={parseInt(amount, 10)} />
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={handleTermsChange}
                color="primary"
              />
            }
            label="Tôi đồng ý với Điều khoản sử dụng của"
          />
          <img
            src="https://pay.vnpay.vn/images/brands/logo-en.svg"
            alt="VNPay"
            style={{ width: "18%", marginTop: 5 }}
          />
          <Typography variant="body2" style={{ marginTop: 10 }}>
            Bằng cách xác nhận Điều khoản Sử dụng, bạn đồng ý và tuân thủ các
            Điều khoản và điều kiện đi kèm.
          </Typography>
          <DialogActions>
            <Button
              variant="contained"
              type="submit"
              disabled={!termsAccepted}
              sx={{
                backgroundColor: "#450b00",
                "&:hover": {
                  backgroundColor: "#ff7f50",
                },
              }}
            >
              Nạp tiền
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderColor: "#450b00",
                color: "#450b00",
                "&:hover": {
                  borderColor: "#ff7f50",
                  color: "#ff7f50",
                },
              }}
            >
              Đóng
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
