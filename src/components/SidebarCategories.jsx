// src/components/SidebarCategories.jsx
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MenuBook, ChevronRight } from "@mui/icons-material";

export default function SidebarCategories({ books = [] }) {
  const location = useLocation();
  
  // 1. Get unique categories from the books data
  const dynamicCategories = Array.from(
    new Set(books.map((book) => book.category))
  ).filter(Boolean).sort(); // filter(Boolean) removes empty values, sort() alphabetizes them

  const currentCategory = decodeURIComponent(
    location.pathname.split("/category/")[1] || ""
  );

  return (
    <Box
      className="scrollbar-hide"
      sx={{
        width: 200,
        backdropFilter: "blur(8px)",
        bgcolor: "rgba(255,255,255,0.3)",
        borderRight: 1,
        borderColor: "divider",
        display: { xs: "none", md: "block" },
        height: "calc(100vh - 160px)",
        position: "sticky",
        top: 160,
        overflowY: "auto",
        overflowX: "hidden",
        maxWidth: "100%",
        // FIXED: Using camelCase for style objects to stop console warnings
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none", 
        scrollbarWidth: "none",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          px: 2,
          py: 1,
          bgcolor: "rgba(13, 27, 42, 0.6)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Categories
      </Typography>

      <List dense>
        {dynamicCategories.map((catName) => {
          const isActive = catName === currentCategory;
          return (
            <ListItemButton
              key={catName}
              component={Link}
              to={`/category/${encodeURIComponent(catName)}`}
              selected={isActive}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.3,
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                "&:hover": {
                  bgcolor: "rgba(13, 27, 42, 0.05)",
                },
                "&.Mui-selected": {
                  bgcolor: "rgba(13, 27, 42, 0.25)",
                  borderLeft: "4px solid #f0b04f", // Changed to your primary theme color
                  "& .MuiListItemText-primary": {
                    fontWeight: "bold",
                    color: "#f0b04f",
                  },
                  "& .MuiListItemIcon-root": { color: "#f0b04f" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "text.secondary" }}>
                <MenuBook fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={catName}
                primaryTypographyProps={{ fontSize: 13, noWrap: true }}
              />
              <ListItemIcon sx={{ minWidth: 20, color: "text.secondary" }}>
                <ChevronRight sx={{ fontSize: 16 }} />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}