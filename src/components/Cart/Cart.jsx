import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Badge,
  Fab,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { formatDateTime, PriceFormat } from "../../utils/tools";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleCheckout = () => {
    navigate("/checkout");
    clearCart();
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.ticketCount,
    0
  );

  return (
    <>
      <Fab
        color="primary"
        aria-label="cart"
        onClick={() => setCartOpen(true)}
        style={{ position: "fixed", bottom: 30, right: 30, zIndex: 1300 }} // Ensure FAB is always on top
        sx={{
          backgroundColor: "#ff7f50",
          color: "white",
          "&:hover": {
            backgroundColor: "#ff7f50",
          },
        }}
      >
        <Badge badgeContent={cartItemCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 310,
            height: "60%", // Set the height of the drawer
            top: 250,
            bottom: "auto", // Adjust to not stick to top or bottom
            position: "fixed",
            overflowY: "auto", // Enable scrolling if content overflows
            borderRadius: 3,
          },
        }}
      >
        <List style={{ width: 300 }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={item.eventBanner}
                    alt={item.eventName}
                    sx={{
                      width: 56,
                      height: 56,
                      marginRight: 1,
                      borderRadius: 2,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {item.eventName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginTop: 2 }}
                      >
                        {formatDateTime(item.startDate)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"

                      >
                        <strong>
                        {item.ticketCount} Vé x { <PriceFormat price={item.ticketPrice} /> }
                        </strong>
                      </Typography>
                    </>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Giỏ Hàng đang trống" />
            </ListItem>
          )}
          {cartItems.length > 0 && (
            <ListItem>
              <Button
                onClick={handleCheckout}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                  color: "white",
                  backgroundColor: "#450b00",
                  "&.Mui-selected": {
                    backgroundColor: "#ff7f50",
                  },
                  "&:hover": {
                    backgroundColor: "#ff7f50",
                  },
                }}
              >
                THANH TOÁN
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Cart;
