// src/components/CartTable.jsx
import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Button, Card, CardContent, Divider, useTheme, useMediaQuery, InputBase
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";

// Helper for manual input
const EditableQty = ({ value, onChange, width = 32 }) => {
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => setTempValue(value), [value]);

  const handleChange = (e) => {
    const val = e.target.value;

    // Only allow empty string or valid numbers
    if (val === '' || /^[0-9]+$/.test(val)) {
      setTempValue(val);

      // Update immediately if it's a valid number
      if (val !== '') {
        const num = parseInt(val, 10);
        if (!isNaN(num)) {
          onChange(num);
        }
      } else {
        // Empty input = 0
        onChange(0);
      }
    }
  };

  const handleBlur = () => {
    // On blur, ensure we have a valid number
    let num = parseInt(tempValue, 10);

    if (tempValue === "" || isNaN(num)) {
      num = 0;
    }

    // Sync with parent if needed
    if (num !== value) {
      onChange(num);
    }
    // Update display to match actual value
    setTempValue(num);
  };

  return (
    <InputBase
      value={tempValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
      sx={{
        width: width,
        mx: 0.5,
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '4px',
        bgcolor: 'rgba(255,255,255,0.5)',
        '&:focus-within': {
          borderColor: '#f0b04f',
          bgcolor: '#fff',
          boxShadow: '0 0 0 2px rgba(240, 176, 79, 0.2)'
        },
        input: { textAlign: 'center', fontWeight: 600, p: 0.5, fontSize: '0.9rem' }
      }}
    />
  );
};

export default function CartTable({ items = [], onUpdateQty, onRemove }) {
  const grandTotal = items.reduce((s, it) => s + (it.price * it.qty), 0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  if (isXs) {
    // Mobile stacked view (tighter paddings)
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: "rgba(13, 27, 42, 0.85)", fontSize: '0.98rem' }}>
          📚 Books Order
        </Typography>
        <Typography color="error" sx={{ mb: 0.75, fontSize: '0.88rem' }}>Shipping extra</Typography>

        {items.map((row) => (
          <Card key={row.id} sx={{ mb: 1.5, p: 1, boxShadow: 1, backgroundColor: '#FDF7EC', borderRadius: 2 }}>
            <CardContent sx={{ p: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0d1b2a' }}>{row.title}</Typography>
                <IconButton size="small" onClick={() => onRemove(row.id)} aria-label="remove" sx={{ color: 'text.secondary' }}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.9rem', minWidth: '70px' }}>
                  ₹ {Number(row.price).toFixed(2)}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: '#f0b04f',
                      color: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      width: 26,
                      height: 26,
                      '&:hover': { bgcolor: '#e6a03d' }
                    }}
                    onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
                  >
                    <Remove fontSize="small" sx={{ fontSize: '0.8rem' }} />
                  </IconButton>

                  <EditableQty
                    value={row.qty}
                    onChange={(val) => onUpdateQty(row.id, val)}
                    width={32}
                  />

                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: '#f0b04f',
                      color: '#fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      width: 26,
                      height: 26,
                      '&:hover': { bgcolor: '#e6a03d' }
                    }}
                    onClick={() => onUpdateQty(row.id, row.qty + 1)}
                  >
                    <Add fontSize="small" sx={{ fontSize: '0.8rem' }} />
                  </IconButton>
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#0d1b2a', minWidth: '90px', textAlign: 'right' }}>
                  ₹ {(row.price * row.qty).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 0.5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.25 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Total</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>₹ {grandTotal.toFixed(2)}</Typography>
        </Box>
      </Box>
    );
  }

  // Desktop/table view (unchanged)
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: "rgba(13, 27, 42, 0.75)" }}>
        📚 Books Order Form
      </Typography>
      <Typography color="error" sx={{ mb: 2 }}>Shipping will be extra.</Typography>

      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: '#FDF7EC' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFC107" }}>
              <TableCell sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1, width: "40%" }}>Book Title</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1, width: "15%", minWidth: 100 }}>Price (₹)</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1, width: "20%" }}>Quantity</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1, width: "15%", minWidth: 120 }}>Total (₹)</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1, width: "10%" }}>Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ maxWidth: 380, py: 0.5, px: 1 }}>{row.title}</TableCell>
                <TableCell align="right" sx={{ py: 0.5, px: 1 }}>₹ {Number(row.price).toFixed(2)}</TableCell>
                <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ minWidth: 36, minHeight: 36, p: 0, backgroundColor: "#f0b04f", color: "#fff", "&:hover": { backgroundColor: "#FF9800" } }}
                      onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
                    >
                      <Remove />
                    </Button>

                    <EditableQty
                      value={row.qty}
                      onChange={(val) => onUpdateQty(row.id, val)}
                      width={45}
                    />

                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ minWidth: 36, minHeight: 36, p: 0, backgroundColor: "#f0b04f", color: "#fff", "&:hover": { backgroundColor: "#FF9800" } }}
                      onClick={() => onUpdateQty(row.id, row.qty + 1)}
                    >
                      <Add />
                    </Button>
                  </Box>
                </TableCell>

                <TableCell align="right" sx={{ py: 0.5, px: 1, minWidth: 120 }}>₹ {(row.price * row.qty).toFixed(2)}</TableCell>

                <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                  <IconButton onClick={() => onRemove(row.id)} aria-label="remove">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} align="right" sx={{ py: 0.6, px: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Total Amount (₹)</Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 0.6, px: 1, minWidth: 120 }}>
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
