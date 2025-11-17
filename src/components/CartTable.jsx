// src/components/CartTable.jsx
import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Button
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function CartTable({ items = [], onUpdateQty, onRemove }) {
  const grandTotal = items.reduce((s, it) => s + (it.price * it.qty), 0);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: "rgba(13, 27, 42, 0.75)" }}>
        📚 Books Order Form
      </Typography>
      <Typography color="error" sx={{ mb: 2 }}>Shipping will be extra.</Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFA726" }}>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Book Title</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: 700 }}>Price (₹)</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>Quantity</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: 700 }}>Total (₹)</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700 }}>Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ maxWidth: 380 }}>{row.title}</TableCell>
                <TableCell align="right">₹ {Number(row.price).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                    {/* Minus button */}
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ minWidth: 36, minHeight: 36, backgroundColor: "#f0b04f", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#FF9800" } }}
                      onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
                    >
                      -
                    </Button>

                    {/* Quantity display */}
                    <Typography sx={{ width: 35, textAlign: "center", fontWeight: 600 }}>{row.qty}</Typography>

                    {/* Plus button */}
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ minWidth: 36, minHeight: 36, backgroundColor: "#f0b04f", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#FF9800" } }}
                      onClick={() => onUpdateQty(row.id, row.qty + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align="right">₹ {(row.price * row.qty).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onRemove(row.id)} aria-label="remove">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography sx={{ fontWeight: 700 }}>Total Amount (₹)</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontWeight: 700 }}>₹ {grandTotal.toFixed(2)}</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
