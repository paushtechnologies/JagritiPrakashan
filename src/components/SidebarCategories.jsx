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
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { MenuBook, ChevronRight } from "@mui/icons-material";

export default function SidebarCategories({ books = [], loading = false }) {
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
        maxWidth: 200, // Fixed typo: maxwidth -> maxWidth
        height: "calc(100vh - 160px)",
        position: "sticky",
        top: 168,
        overflowY: "auto",
        overflowX: "hidden",
        display: { xs: "none", md: "block" },

        // Glass effect
        backdropFilter: "blur(8px)",
        bgcolor: "rgba(246, 237, 226, 0.1)",
        borderRight: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        borderRadius: "0 16px 16px 0",

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
          borderTopRightRadius: 16,
        }}
      >
        <Typography fontWeight={500} fontSize={14} letterSpacing={1} >
          Categories
        </Typography>
      </Box>

      <Divider />

      {/* Category list */}
      <List dense sx={{ px: 1, py: 1 }}>
        {loading
          ? Array.from(new Array(12)).map((_, i) => (
            <Box key={i} sx={{ px: 1.5, py: 0.8, mb: 0.5 }}>
              <Skeleton
                variant="rectangular"
                height={28}
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
                selected={isActive}
                sx={{
                  mb: 0.5,
                  px: 1.5,
                  py: 0.8,
                  borderRadius: 2,
                  transition: "all 0.25s ease",

                  "&:hover": {
                    bgcolor: "rgba(240,176,79,0.12)",
                    transform: "translateX(4px)",
                  },

                  "&.Mui-selected": {
                    bgcolor: "rgba(240,176,79,0.18)",
                    boxShadow: "inset 4px 0 0 #f0b04f",

                    "& .MuiListItemText-primary": {
                      fontWeight: 700,
                      color: "#f0b04f",
                    },

                    "& .MuiListItemIcon-root": {
                      color: "#f0b04f",
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
                    noWrap: true,
                    mr: 1,
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
