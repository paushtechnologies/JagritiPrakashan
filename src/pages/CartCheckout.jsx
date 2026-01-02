// src/pages/CartCheckout.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box, Paper, Typography, IconButton, Fab, Badge, Button, Portal } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDownwardIcon from '@mui/icons-material/KeyboardArrowDown';
import CartTable from "../components/CartTable";
import CheckoutForm from "../components/CheckoutForm";

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
  const scrollBoxRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location && location.state && location.state.scrollToCheckout) {
      // Minimal timeout for DOM render
      requestAnimationFrame(() => {
        const el = checkoutRef.current;
        if (el) {
          const header = typeof document !== 'undefined' && document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 64;
          const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  }, [location]);

  // update scroll indicators for the cart table wrapper
  const updateIndicators = () => {
    const el = scrollBoxRef.current;
    if (!el) return;
    const scLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setShowLeft(scLeft > 8);
    setShowRight(maxScrollLeft - scLeft > 8);
  };

  useEffect(() => {
    // Immediate initial state
    updateIndicators();
    window.addEventListener('resize', updateIndicators);
    return () => window.removeEventListener('resize', updateIndicators);
  }, []);

  const scrollByAmount = (amount = 160) => {
    const el = scrollBoxRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    // Update indicators after scroll completes
    requestAnimationFrame(() => {
      setTimeout(updateIndicators, 100);
    });
  };

  return (
    <Box sx={{ mt: { xs: 2, sm: 4 }, px: { xs: 1, sm: 0 } }}>
      <Paper sx={{ p: { xs: 1, sm: 2 }, overflow: 'hidden', position: 'relative' }}>
        <Box ref={scrollBoxRef} sx={{ overflowX: 'auto' }} onScroll={updateIndicators}>
          <CartTable items={items} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />
        </Box>

        {/* Mobile-only scroll affordances */}
        <Box
          sx={{
            display: { xs: showLeft ? 'block' : 'none', sm: 'none' },
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 28,
            pointerEvents: 'none',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
            transition: 'opacity 200ms ease'
          }}
        />
        <Box
          sx={{
            display: { xs: showRight ? 'block' : 'none', sm: 'none' },
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 28,
            pointerEvents: 'none',
            background: 'linear-gradient(270deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
            transition: 'opacity 200ms ease'
          }}
        />

        {/* Clickable chevrons for stronger affordance (mobile only) */}
        <IconButton
          aria-label="scroll left"
          onClick={() => scrollByAmount(-160)}
          sx={{
            display: { xs: showLeft ? 'flex' : 'none', sm: 'none' },
            position: 'absolute',
            left: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="scroll right"
          onClick={() => scrollByAmount(160)}
          sx={{
            display: { xs: showRight ? 'flex' : 'none', sm: 'none' },
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            bgcolor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Paper>

      <Paper sx={{ p: { xs: 1, sm: 2 }, mt: 3 }} ref={checkoutRef}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Checkout
        </Typography>
        <CheckoutForm
          cartItems={items.filter((i) => i.qty > 0)} // only send items with qty > 0
          cartTotal={items.reduce((sum, i) => sum + i.qty * i.price, 0)}
          onClearCart={clearCart}
          onUpdateQty={handleUpdateQty} // pass the same handler
        />
      </Paper>
      {/* Floating Checkout Shortcut for Cart Page */}
      {cart.length > 0 && (
        <Portal>
          <Fab
            aria-label="go to checkout"
            onClick={() => {
              const el = checkoutRef.current;
              if (el) {
                const header = typeof document !== 'undefined' && document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 64;
                const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            sx={{
              position: 'fixed',
              bottom: { xs: 72, sm: 32 },
              right: { xs: 16, sm: 32 },
              zIndex: 2000,
              bgcolor: '#f0b04f',
              color: '#0d1b2a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              '&:hover': { bgcolor: '#d99a3d' },
            }}
          >
            <Badge
              badgeContent={cart.reduce((acc, item) => acc + item.qty, 0)}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: '#0d1b2a',
                  color: '#fff',
                  fontWeight: 700,
                  border: '1px solid #fff'
                }
              }}
            >
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
                <ArrowDownwardIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCartIcon />
              </Box>
            </Badge>
          </Fab>
        </Portal>
      )}
    </Box>
  );
}
