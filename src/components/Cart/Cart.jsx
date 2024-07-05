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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (index) => {
    removeFromCart(index);
    // toast.success("Item removed from cart");
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
        style={{ position: "fixed", bottom: 30, right: 30 }}
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
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <List style={{ width: 250 }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${item.ticketCount} x ${item.eventName}`}
                  secondary={`${item.location} - ${new Date(
                    item.startDate
                  ).toLocaleDateString()}`}
                />
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
              >
                Checkout
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Cart;
