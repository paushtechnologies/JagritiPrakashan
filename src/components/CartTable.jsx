// src/components/CartTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  InputBase,
  Skeleton,
} from "@mui/material";
import { Delete, Add, Remove, Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { matchesBook } from "../utils/bookSearch";

/* ===================== Editable Quantity ===================== */

const EditableQty = ({ value, onChange, width = 55 }) => {
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => setTempValue(value), [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[0-9]+$/.test(val)) {
      setTempValue(val);
      onChange(val === "" ? 0 : parseInt(val, 10));
    }
  };

  const handleBlur = () => {
    const num = parseInt(tempValue, 10);
    onChange(isNaN(num) ? 0 : num);
    setTempValue(isNaN(num) ? 0 : num);
  };

  return (
    <InputBase
      value={tempValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      sx={{
        width,
        mx: 0.5,
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: 1,
        bgcolor: "#fff",
        input: {
          textAlign: "center",
          fontWeight: 600,
          p: 0.5,
          fontSize: "0.9rem",
        },
      }}
    />
  );
};

/* ===================== Memoized Components ===================== */

const BookCard = React.memo(({ row, onUpdateQty, onRemove }) => {
  return (
    <Card
      sx={{
        mt: 1.5,
        p: 1,
        boxShadow: 1,
        backgroundColor: "#FDF7EC",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.2 }}>
              {row.title}
            </Typography>
            {row.author && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontStyle: "italic", display: "block", mt: 0.2 }}
              >
                {row.author}
              </Typography>
            )}
          </Box>
          <IconButton size="small" onClick={() => onRemove(row.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.85rem" }}>
            {row.price > 0 ? (
              `₹ ${row.price.toFixed(2)}`
            ) : (
              <Skeleton variant="text" width={40} animation="wave" />
            )}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
              sx={{
                width: 26,
                height: 26,
                bgcolor: "#f0b04f",
                color: "rgb(0,0.0,0.25)",
                fontWeight: 700,
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                "&:hover": { bgcolor: "#e6a03d", transform: "scale(1.08)" },
                transition: "all 0.2s ease",
              }}
            >
              <Remove fontSize="small" />
            </IconButton>

            <EditableQty value={row.qty} onChange={(val) => onUpdateQty(row.id, val)} />

            <IconButton
              size="small"
              onClick={() => onUpdateQty(row.id, row.qty + 1)}
              sx={{
                width: 26,
                height: 26,
                bgcolor: "#f0b04f",
                color: "rgba(0,0,0,1)",
                fontWeight: 700,
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                "&:hover": { bgcolor: "#e6a03d", transform: "scale(1.08)" },
                transition: "all 0.2s ease",
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>

          <Typography sx={{ fontWeight: 700 }}>
            {row.price > 0 ? `₹ ${(row.price * row.qty).toFixed(2)}` : "—"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

const BookRow = React.memo(({ row, onUpdateQty, onRemove }) => {
  return (
    <TableRow
      sx={{
        transition: 'all 0.2s ease',
        '&:hover': { backgroundColor: "rgba(240,176,79,0.08)" }
      }}
    >
      <TableCell sx={{ width: "25%", fontSize: 16, fontWeight: 400 }}>
        {row.title}
      </TableCell>
      <TableCell sx={{ width: "15%", fontSize: 14, fontWeight: 400, color: "text.secondary" }}>
        {row.author || "—"}
      </TableCell>
      <TableCell align="center" sx={{ width: 100, fontSize: 16, fontWeight: 400 }}>
        {row.price > 0 ? `${row.price.toFixed(0)}` : "—"}
      </TableCell>
      <TableCell align="center" sx={{ width: 150 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            size="small"
            onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#f0b04f",
              color: "rgba(0,0,0,1)",
              fontWeight: 700,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#e6a03d", transform: "scale(1.08)" },
              transition: "all 0.2s ease"
            }}
          >
            <Remove fontSize="small" />
          </IconButton>
          <EditableQty value={row.qty} onChange={(val) => onUpdateQty(row.id, val)} width={65} />
          <IconButton
            size="small"
            onClick={() => onUpdateQty(row.id, row.qty + 1)}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#f0b04f",
              color: "rgba(0,0,0,1)",
              fontWeight: 700,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#e6a03d", transform: "scale(1.08)" },
              transition: "all 0.2s ease"
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="right" sx={{ width: 120, fontSize: 16, fontWeight: 700 }}>
        {row.price > 0 ? `${(row.price * row.qty).toFixed(2)}` : "—"}
      </TableCell>
      <TableCell align="center" sx={{ width: 100 }}>
        <IconButton onClick={() => onRemove(row.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

/* ===================== CartTable ===================== */

export default function CartTable({ items = [], onUpdateQty, onRemove }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQuery] = React.useState("");

  /* 🔍 SAME SEARCH LOGIC AS HEADER */
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => matchesBook(item, query));
  }, [items, query]);

  const grandTotal = filteredItems.reduce((s, it) => s + it.price * it.qty, 0);

  /* ===================== Search Bar ===================== */

  const SearchBar = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: { xs: 0.5, sm: 1 },
        py: { xs: 0, sm: 0.2 },
        mb: 1.2,
        width: "100%",
        maxWidth: { xs: "100%", sm: 380 },

        /* GOLD GLASS */
        background:
          "linear-gradient(135deg, rgba(255,248,235,0.98), rgba(240,176,79,0.18))",
        borderRadius: "999px",
        border: "1.5px solid rgba(240,176,79,0.6)",

        transition: "border-color 0.2s ease, background 0.2s ease",

        "&:focus-within": {
          background: "#fff",
          borderColor: "#f0b04f",
        },
      }}
    >
      {/* SEARCH ICON */}
      <SearchIcon
        sx={{
          color: "#f0b04f",
          fontSize: 22,
          ml: 0.5,
        }}
      />

      {/* INPUT */}
      <InputBase
        placeholder="Search book, author, publisher…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          flex: 1,
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#0d1b2a",

          "& input::placeholder": {
            color: "rgba(13,27,42,0.5)",
            fontWeight: 400,
          },
        }}
      />

      {/* CLEAR BUTTON */}
      {query && (
        <IconButton
          size="small"
          onClick={() => setQuery("")}
          sx={{
            color: "#f0b04f",
            "&:hover": {
              bgcolor: "rgba(240,176,79,0.12)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );

  /* ===================== MOBILE VIEW ===================== */

  if (isXs) {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 0.5, fontWeight: 700, fontSize: "0.95rem" }}
        >
          📚 Books Order
        </Typography>

        <Typography color="error" sx={{ mb: 0.65, fontSize: "0.85rem" }}>
          Shipping will be extra
        </Typography>

        {SearchBar}

        <Box
          sx={{
            maxHeight: "60vh",
            overflowY: "auto",
            px: 0.5,
            pt: 1,
            // 🎨 Edge Fading
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
            // Custom Scrollbar
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(240,176,79,0.3)', borderRadius: '10px' }
          }}
        >
          {filteredItems.map((row) => (
            <BookCard key={row.id} row={row} onUpdateQty={onUpdateQty} onRemove={onRemove} />
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={700}>Total</Typography>
          <Typography fontWeight={700}>
            {isNaN(grandTotal) ? "—" : `₹ ${grandTotal.toFixed(2)}`}
          </Typography>
        </Box>
      </Box>
    );
  }

  /* ===================== DESKTOP VIEW ===================== */

  return (
    <Box>
      {/* HEADER ROW WITH SEARCH */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "rgba(13,27,42,0.75)" }}
          >
            📚 Books Order Form
          </Typography>
          <Typography color="error" sx={{ fontSize: "0.9rem" }}>
            Shipping will be extra
          </Typography>
        </Box>

        {SearchBar}
      </Box>

      <Box sx={{ position: "relative", p: 0.5 }}>
        <Box
          sx={{
            backgroundColor: "#FDF7EC",
            border: "1px solid #eee",
            borderRadius: 2,
            overflow: "hidden", // Clip the children
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* 1. FIXED HEADER TABLE */}
          <Box sx={{ flexShrink: 0, scrollbarGutter: "stable" }}>
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <TableHead
                sx={{
                  backgroundColor: "#ffc107", // Solid Brand Golden
                  color: "#1b1818",
                  '& .MuiTableCell-head': {
                    color: "inherit",
                    fontWeight: 600,
                    borderBottom: "2px solid #f0b04f",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    letterSpacing: 0.5,
                    py: 1.5
                  }
                }}
              >
                <TableRow>
                  <TableCell sx={{ width: "25%" }}>Book Title</TableCell>
                  <TableCell sx={{ width: "15%" }}>Author</TableCell>
                  <TableCell align="center" sx={{ width: 100 }}>Price (₹)</TableCell>
                  <TableCell align="center" sx={{ width: 150 }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ width: 120 }}>Total (₹)</TableCell>
                  <TableCell align="center" sx={{ width: 100 }}>Remove</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Box>

          {/* 2. SCROLLABLE BODY TABLE */}
          <Box
            sx={{
              maxHeight: "650px", // Slightly smaller to leave room for visual comfort
              overflowY: "auto",
              scrollbarGutter: "stable",
              // 🎨 Edge Fading (Bottom only now)
              WebkitMaskImage: 'linear-gradient(to bottom, black 92%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 92%, transparent 100%)',
              // Custom Scrollbar
              '&::-webkit-scrollbar': { width: '5px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(240,176,79,0.3)', borderRadius: '10px' },
            }}
          >
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <TableBody>
                {filteredItems.map((row) => (
                  <BookRow key={row.id} row={row} onUpdateQty={onUpdateQty} onRemove={onRemove} />
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* 3. STICKY FOOTER TABLE (Total) */}
          <Box sx={{ flexShrink: 0, borderTop: "2px solid #eee", scrollbarGutter: "stable" }}>
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <TableBody>
                <TableRow sx={{ bgcolor: "rgba(255, 193, 7, 0.05)" }}>
                  {/* <TableCell colSpan={4} align="right" sx={{ border: 0, py: 1.5 }}>
                    <Typography fontWeight={700}>Grand Total Amount (₹)</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ border: 0, width: 120 }}>
                    <Typography fontWeight={900} variant="h6" sx={{ color: "#d32f2f" }}>
                      {isNaN(grandTotal) ? "—" : `₹ ${grandTotal.toFixed(2)}`}
                    </Typography>
                  </TableCell> */}
                  <TableCell sx={{ border: 0, width: 100 }} />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* 📚 SCROLL HINT FOR NAIVE USERS */}
        {filteredItems.length > 6 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 80, // Moved up to stay above the total row
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "rgba(240, 176, 79, 1)", // Brighter golden
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(240, 176, 79, 0.5)",
              zIndex: 100,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.85rem",
              fontWeight: 800,
              transition: "opacity 0.3s ease",
              animation: "hintBounce 2s infinite ease-in-out",
              "@keyframes hintBounce": {
                "0%, 100%": { transform: "translateX(-50%) translateY(0)", opacity: 0.95 },
                "50%": { transform: "translateX(-50%) translateY(8px)", opacity: 1 }
              }
            }}
          >
            <span>📜 SCROLL DOWN FOR ALL BOOKS</span>
            {/* <Add sx={{ fontSize: 18, transform: "rotate(45deg)" }} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
}
