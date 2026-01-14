import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  Divider,
  Skeleton,
  ListItem,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MenuBook, ChevronRight } from "@mui/icons-material";

export default function SidebarCategories({ books = [], loading = false, mobile = false, onClose = () => { } }) {
  const location = useLocation();

  // Extract unique categories
  const dynamicCategories = Array.from(
    new Set(books.map((book) => book.category))
  )
    .filter(Boolean)
    .sort();

  const currentCategory = decodeURIComponent(
    location.pathname.split("/category/")[1] || ""
  );

  return (
    <Box
      className="scrollbar-hide"
      sx={{
        ...(mobile
          ? {
            width: "100%",
            maxWidth: "100%",
            height: "100%", // 👈 Fill drawer height
            overflowY: "auto", // 👈 Enable scrolling within the component
            display: "block",
            bgcolor: "rgba(246, 237, 226, 0.95)", // 👈 Match desktop color
            backdropFilter: "blur(12px)",
          }
          : {
            maxWidth: 200,
            height: { xs: "calc(100vh - 135px)", sm: "calc(100vh - 186px)" }, // Responsive height: account for header + margin
            position: "sticky",
            top: 175,
            alignSelf: "flex-start", // Ensure it aligns to top of flex container
            overflowY: "auto",
            overflowX: "hidden",
            display: { xs: "none", md: "block" },
            zIndex: 1200, // Above secondary nav (1100) but below main header (1300)
            backdropFilter: "blur(8px)",
            bgcolor: "rgba(246, 237, 226, 0.1)",
            borderRight: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            borderRadius: "0 16px 16px 0",
            mt: { xs: 0, sm: 0 }, // Ensure no margin that could push it down
          }),

        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          background:
            "linear-gradient(135deg, rgba(13,27,42,0.9), rgba(13,27,42,0.75))",
          color: "#fff",
          borderTopRightRadius: mobile ? 0 : 16, // Remove radius for mobile bottom sheet
          borderTopLeftRadius: mobile ? 0 : 0, // Ensure no clipping on top-left
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0, // Prevent header from shrinking
          minHeight: "48px", // Ensure minimum height for visibility
        }}
      >
        <Typography
          fontWeight={500}
          fontSize={14}
          letterSpacing={1}
          sx={{
            whiteSpace: "nowrap", // Prevent text wrapping
            overflow: "visible", // Ensure text is not clipped
            textOverflow: "clip", // Don't use ellipsis
            flex: 1, // Take available space
          }}
        >
          Categories
        </Typography>

        {mobile && (
          <Box
            onClick={onClose}
            component="span"
            sx={{
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "bold",
              lineHeight: 1,
              opacity: 0.8
            }}
          >
            ✕
          </Box>
        )}
      </Box>

      <Divider />

      {/* Mobile Actions (Cart & Pay) */}
      {mobile && (
        <Box sx={{ p: 2, pb: 0 }}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              component={Link}
              to="/cart"
              state={{ scrollToCheckout: true }} // 👈 Magic param to auto-scroll
              onClick={onClose}
              variant="outlined"
              fullWidth
              sx={{
                fontWeight: 700,
                borderWidth: 2,
                borderColor: "primary.main", // 👈 Theme gold
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.dark",
                  color: "primary.dark",
                  bgcolor: "rgba(240, 176, 79, 0.1)"
                }
              }}
            >
              Checkout
            </Button>
            <Button
              component={Link}
              to="/pay"
              onClick={onClose}
              variant="contained"
              color="success"
              fullWidth
              sx={{ fontWeight: 700 }}
            >
              Pay Now
            </Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Category list */}
      <List dense sx={{ px: 1, py: 1 }}>
        {loading
          ? Array.from(new Array(12)).map((_, i) => (
            <Box key={i} sx={{ px: 1.5, py: 0.8, mb: 0.5 }}>
              <Skeleton
                variant="rectangular"
                height={18}
                animation="wave"
                sx={{ borderRadius: 1 }}
              />
            </Box>
          ))
          : dynamicCategories.map((catName) => {
            const isActive = catName === currentCategory;

            return (
              <ListItemButton
                key={catName}
                component={Link}
                to={`/category/${encodeURIComponent(catName)}`}
                onClick={onClose}
                selected={isActive}
                sx={{
                  mb: 0.5,
                  px: 1.5,
                  py: 0.8,
                  borderRadius: 2,
                  transition: "all 0.25s ease",
                  alignItems: "flex-start",

                  "&:hover": {
                    bgcolor: "rgba(240,176,79,0.12)",
                    transform: "translateX(4px)",
                  },

                  "&.Mui-selected": {
                    bgcolor: "rgba(240,176,79,0.25)", // 👈 Darker background for visibility
                    boxShadow: "inset 4px 0 0 #d99a3d", // 👈 Darker orange accent

                    "& .MuiListItemText-primary": {
                      fontWeight: 700,
                      color: "#b06c00", // 👈 Darker text for contrast
                    },

                    "& .MuiListItemIcon-root": {
                      color: "#b06c00", // 👈 Match icon color
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: "rgba(13,27,42,0.65)",
                  }}
                >
                  <MenuBook fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={catName}
                  primaryTypographyProps={{
                    fontSize: 13,
                    mr: 1,
                    lineHeight: 1.3,
                    sx: {
                      display: "block",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    },
                  }}
                />

                <ChevronRight
                  sx={{
                    fontSize: 16,
                    opacity: 0.6,
                  }}
                />
              </ListItemButton>
            );
          })}
      </List>
    </Box>
  );
}
