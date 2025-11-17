import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Button,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import footershell from "../assets/footershell.jpg"; // background image

export default function Header({ cartCount = 0, onCart, onToggleMode, mode }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const goToFooter = () => {
    if (window.location.pathname !== "/") {
      navigate("/#footer-section");
    } else {
      const footer = document.getElementById("footer-section");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Main header with background image */}
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6)), url(${footershell})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: 2, // top & bottom padding
          top: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px" }}>
          {/* Left: Search */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.6)", // More whitish
              borderRadius: 2,
              px: 1,
              width: 220,
              boxShadow: 1,
            }}
          >
            <InputBase
              placeholder="Search books, publisher"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              sx={{ ml: 1, flex: 1, fontSize: 14, color: "#000" }}
            />
            <IconButton type="submit" size="small" sx={{ color: "#000" }}>
              <SearchIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Middle: Logo + Publisher name + tagline */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ width: 80, height: 80, borderRadius: "50%", mr: 1 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  textAlign: "left",
                  lineHeight: 1,
                }}
              >
                जागृति प्रकाशन
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontStyle: "italic",
                  color: "#f0f0f0",
                  textAlign: "center",
                  fontSize: "16px"
                }}
              >
                ज्ञान की धरोहर, आपके साथ
              </Typography>
            </Box>
          </Box>

          {/* Right: Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFA726", // softer amber
                "&:hover": { bgcolor: "#fb8c00" },
              }}
              startIcon={<ShoppingCart />}
              onClick={onCart}
            >
              Order Now ({cartCount})
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/pay")}
            >
              Pay Now
            </Button>
            {/* Light/Dark mode toggle */}
            <IconButton onClick={onToggleMode} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Secondary Nav */}
      <AppBar
        position="fixed"
        sx={{
          // background: 'linear-gradient(90deg, #FF6F00 0%, #FFA000 50%, #FFD54F 100%)',
          background: 'linear-gradient(90deg, rgba(13, 27, 42, 0.9) 0%, rgba(13, 27, 42, 0.7) 20%, #FFB74D 50%, rgba(13, 27, 42, 0.6) 80%, rgba(13, 27, 42, 0.8) 100%)',
          // background: "rgba(13, 27, 42, 0.8)",
          height: 40,
          justifyContent: "center",
          mt: 0, // margin-top (gap between bars)
          mb: 0, // margin-bottom
          top:"118px"
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            minHeight: "30px !important",
            height: "30px",
            padding: 0,
          }}
        >
          <Button sx={{ color: "#fff", fontSize: "16px", fontWeight: 550 }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button sx={{ color: "#fff", fontSize: "16px", fontWeight: 550 }} onClick={() => navigate("/gallery")}>
            Books Gallery
          </Button>
          <Button sx={{ color: "#fff", fontSize: "16px", fontWeight: 550 }} onClick={() => navigate("/cart")}>
            Book Order
          </Button>
          <Button sx={{ color: "#fff", fontSize: "16px", fontWeight: 550 }} onClick={() => navigate("/about")}>
            About Us
          </Button>
          <Button sx={{ color: "#fff", fontSize: "16px", fontWeight: 550 }} onClick={() => navigate("/media")}>
            Media & Moments
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
