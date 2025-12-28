// src/pages/SearchResults.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, Grid, Divider, Stack, Paper, Button } from "@mui/material";
import BookCard from "../components/BookCard";

export default function SearchResults({ books = [], addToCart, loading = false }) {
  const q = new URLSearchParams(useLocation().search).get("q") || "";
  const qq = q.trim().toLowerCase();

  const results = qq ? books.filter(b => {
    const hay = `${b.title} ${b.author || ""} ${b.isbn || ""} ${b.publisher || ""} ${b.category || ""} ${b.description || ""}`.toLowerCase();
    return hay.includes(qq);
  }) : [];

  const cardResults = results.filter(b => b.display === "card");
  const listResults = results.filter(b => b.display === "list");

  // State to track quantities for each book in the list
  const [listQtys, setListQtys] = React.useState({});

  const handleQtyChange = (id, val) => {
    if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 99999)) {
      setListQtys(prev => ({ ...prev, [id]: val }));
    }
  };

  const handleQtyBlur = (id, val) => {
    if (val === "" || parseInt(val) < 1) {
      setListQtys(prev => ({ ...prev, [id]: 1 }));
    }
  };

  return (
    <Box sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Search results for “{q}”</Typography>

      {loading ? (
        <Grid container spacing={2}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <BookCard loading={true} />
            </Grid>
          ))}
        </Grid>
      ) : qq === "" ? (
        <Typography>Enter a search term in the header to find books.</Typography>
      ) : results.length === 0 ? (
        <Typography>No results found.</Typography>
      ) : (
        <>
          {/* Card Results */}
          {cardResults.length > 0 && (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {cardResults.map(b => (
                <Grid key={b.id} item xs={12} sm={6} md={3}>
                  <BookCard book={b} onAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          )}

          {/* List Results */}
          {listResults.length > 0 && (
            <Box>
              {cardResults.length > 0 && <Divider sx={{ my: 3 }} />}
              <Stack spacing={1.5}>
                {listResults.map((b) => (
                  <Paper
                    key={b.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: 2,
                      borderColor: "primary.main",
                      borderRadius: 3,
                      bgcolor: "rgba(255, 255, 255, 1)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#fff",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={800}
                        sx={{
                          color: "#1a1a1a",
                          fontSize: "1.05rem",
                          lineHeight: 1.2,
                          mb: 0.5,
                        }}
                      >
                        {b.title}
                      </Typography>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 0.5, sm: 1.5 }}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                      >
                        {b.author && (
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            लेखक: {b.author}
                          </Typography>
                        )}
                        {b.author && b.publisher && (
                          <Box sx={{ display: { xs: "none", sm: "block" }, width: 4, height: 4, bgcolor: "divider", borderRadius: "50%" }} />
                        )}
                        {b.publisher && (
                          <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                            प्रकाशन: {b.publisher}
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <Box sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.5, sm: 2 },
                      width: { xs: "100%", sm: "auto" },
                      justifyContent: { xs: "space-between", sm: "flex-end" }
                    }}>
                      {b.price && (
                        <Typography fontWeight={800} color="success.main" sx={{ fontSize: "1.2rem", minWidth: "80px" }}>
                          ₹{b.price}
                        </Typography>
                      )}

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TextField
                          type="number"
                          size="small"
                          label="Qty"
                          value={listQtys[b.id] ?? 1}
                          onChange={(e) => handleQtyChange(b.id, e.target.value)}
                          onBlur={(e) => handleQtyBlur(b.id, e.target.value)}
                          inputProps={{
                            min: 1,
                            max: 99999,
                            style: { textAlign: 'center', fontWeight: 600 }
                          }}
                          sx={{
                            width: 105,
                            "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff" }
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => addToCart(b.id, parseInt(listQtys[b.id]) || 1)}
                          sx={{
                            bgcolor: "#f0b04f",
                            color: "#fff",
                            fontWeight: 800,
                            textTransform: "none",
                            borderRadius: 2,
                            px: 5,
                            py: 1,
                            boxShadow: "0 4px 10px rgba(240, 176, 79, 0.2)",
                            "&:hover": {
                              bgcolor: "#d99a3d",
                              boxShadow: "0 6px 15px rgba(240, 176, 79, 0.3)",
                            },
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}

      <Box sx={{ mt: 3 }}>
        <Link to="/">Back to Home</Link>
      </Box>
    </Box>
  );
}
