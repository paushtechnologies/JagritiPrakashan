// src/pages/CartCheckout.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import CartTable from "../components/CartTable";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutFab from "../components/CheckoutFab";

export default function CartCheckout({
  books = [],
  cart = [],
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
  cartTotal = 0
}) {
  // Update quantity handler for CartTable and CheckoutForm
  const handleUpdateQty = (id, qty) => {
    const inCart = cart.some((item) => item.id === id);
    if (!inCart && qty > 0) {
      addToCart(id, qty);
    } else {
      updateQty(id, qty);
    }
  };
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Merge books with cart quantities
    const merged = books.map((book) => {
      const cartItem = cart.find((c) => c.id === book.id);
      return cartItem ? { ...book, qty: cartItem.qty } : { ...book, qty: 0 };
    });
    setItems(merged);
  }, [books, cart]);

  // Remove handler for CartTable
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const checkoutRef = useRef(null);
  const handleFabClick = () => {
    if (checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ mt: 24 }}>
      <Paper sx={{ p: 2 }}>
        <CartTable items={items} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />
      </Paper>

      <Paper sx={{ p: 2, mt: 3 }} ref={checkoutRef}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Checkout
        </Typography>
        <CheckoutForm
          cartItems={items.filter((i) => i.qty > 0)} // only send items with qty > 0
          cartTotal={items.reduce((sum, i) => sum + i.qty * i.price, 0)}
          onClearCart={clearCart}
          onUpdateQty={handleUpdateQty} // pass the same handler
        />
      </Paper>
      <CheckoutFab cartCount={cart.reduce((s, i) => s + i.qty, 0)} onClick={handleFabClick} />
    </Box>
  );
}
