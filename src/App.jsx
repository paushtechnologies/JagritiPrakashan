// src/App.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { getAssetPath } from "./utils/assetPath";
import { loadCart, saveCart, subscribeCartChanges } from "./utils/cartStorage";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Category from "./pages/Category";
import BookDetails from "./pages/BookDetails";
import CartCheckout from "./pages/CartCheckout";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import PayPage from "./pages/PayPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SidebarCategories from "./components/SidebarCategories";
import CheckoutFab from "./components/CheckoutFab";
import { SITE } from "./config";
import MediaAndMoments from "./pages/MediaAndMoments";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("light");
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#f0b04f" },
                secondary: { main: "#FF9800" },
                success: { main: "#2e7d32" },
                error: { main: "#ad1457" },
                // background: { default: "rgba(13, 27, 42, 0.05)", paper: "#ffffff" },
                text: { primary: "#212121", secondary: "#555" },
              }
            : {
                primary: { main: "#90caf9" },
                secondary: { main: "#ffb74d" },
                success: { main: "#81c784" },
                error: { main: "#f48fb1" },
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#f5f5f5", secondary: "#aaa" },
              }),
        },
        typography: {
          fontFamily: '"Playfair Display","Roboto","Helvetica","Arial",sans-serif',
          h4: { fontWeight: 800 },
          h6: { fontWeight: 700 },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => ({
              body: {
                ...(mode === "light"
                  ? {
                      // Desktop/tablet default
                      background: `url('${getAssetPath("assets/mainbg.jpg")}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundAttachment: "fixed",
                      backgroundPosition: "bottom",

                      // MOBILE OVERRIDE (remove image)
                      [theme.breakpoints.down("sm")]: {
                        background:
                          "linear-gradient(135deg, #f8f4ee 0%, #f6ede2 35%, #e3cbb1 70%, #d7a77a 100%)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundAttachment: "fixed",
                      },
                    }
                  : {
                      backgroundImage: "none",
                      backgroundColor: "#1D1E20",
                    }),
              },
            }),
          },
        },
      }),
    [mode]
  );

  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
  const SHEET_URL = "https://opensheet.elk.sh/1nDau8jwrOL7rBjpof5W69YxWNJMJWQLskQ7ENhLK8tk/Sheet1";

  fetch(SHEET_URL)
    .then((res) => res.json())
    .then((data) => {
      const normalized = data.map((b) => {
        
        // 1. Extract the Google Drive ID from the "cover" field
        let rawUrl = b.cover || "";
        let finalImageUrl = rawUrl;

        if (rawUrl.includes("drive.google.com")) {
          // This regex finds the long ID string between /d/ and /view
          const idMatch = rawUrl.match(/\/d\/(.+?)\//);
          if (idMatch && idMatch[1]) {
            const fileId = idMatch[1];
            // 2. Convert to a direct-render thumbnail URL
            finalImageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s1000`;
          }
        }

        return {
          ...b,
          id: Number(b.id),
          price: Number(b.price),
          year: Number(b.year),
          image: finalImageUrl, // We save it as .image so your components don't break
        };
      });

      setBooks(normalized);
      setBooksLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load books:", err);
      setBooksLoading(false);
    });
}, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Sync cart across tabs
  useEffect(() => {
    const unsubscribe = subscribeCartChanges((newCart) => {
      setCart(newCart || []);
    });
    return unsubscribe;
  }, []);

  const addToCart = (bookId, qty = 1) => {
    setCart((prevCart) => {
      const book = books.find((b) => b.id === bookId);
      if (!book) return prevCart;

      // find index of book in cart
      const index = prevCart.findIndex((item) => item.id === bookId);

      if (index >= 0) {
        // update qty safely
        const updatedCart = [...prevCart];
        updatedCart[index] = {
          ...updatedCart[index],
          qty: Math.min(999, updatedCart[index].qty + Number(qty)),
        };
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          id: book.id,
          title: book.title,
          price: book.price,
          qty: Number(qty),
        },
      ];
    });
  };

  const updateQty = (bookId, qty) =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === bookId ? { ...i, qty: Math.max(0, Math.min(999, qty)) } : i
        )
        .filter((i) => i.qty > 0)
    );

  const removeFromCart = (bookId) =>
    setCart((prev) => prev.filter((i) => i.id !== bookId));

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />

      <Header
        cartCount={cartCount}
        onCart={() => navigate("/cart")}
        onToggleMode={toggleMode}
        mode={mode}
      />
            // Inside App.jsx return statement
      <div style={{ display: "flex" }}>
        {(location.pathname === "/" || location.pathname.startsWith("/book/")) && (
          <SidebarCategories books={books} /> // <--- Add books={books} here
        )}
        

      {/* <div style={{ display: "flex" }}>
        {(location.pathname === "/" ||
          location.pathname.startsWith("/book/")) && <SidebarCategories />} */}

        <Container maxWidth="lg" sx={{ mt: 2, mb: 6, flex: 1 }}>
          {booksLoading ? (
            <Box sx={{ textAlign: "center", mt: 6 }}>Loading books…</Box>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Home books={books} addToCart={addToCart} />}
              />
              <Route
                path="/category/:category"
                element={<Category books={books} addToCart={addToCart} />}
              />
              <Route
                path="/book/:id"
                element={<BookDetails books={books} addToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <CartCheckout
                    books={books}
                    cart={cart}
                    addToCart={addToCart}
                    updateQty={updateQty}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    cartTotal={cartTotal}
                    siteConfig={SITE}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/gallery"
                element={<Gallery books={books} addToCart={addToCart} />}
              />
              <Route path="/pay" element={<PayPage />} />
              <Route path="/media" element={<MediaAndMoments />} />
              <Route
                path="/search"
                element={<SearchResults books={books} addToCart={addToCart} />}
              />
            </Routes>
          )}
        </Container>
      </div>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <CheckoutFab
          cartCount={cartCount}
          onClick={() =>
            navigate("/cart", { state: { scrollToCheckout: true } })
          }
        />
      </Box>

      <Footer siteTitle={SITE.title} contactEmail={SITE.contactEmail} />
    </ThemeProvider>
  );
}

export default App;
