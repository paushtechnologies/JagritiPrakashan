import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Divider, Stack, Paper, Button, TextField } from "@mui/material";
import BookCard from "../components/BookCard";
import SEO from "../components/SEO";

export default function Category({ books = [], addToCart, loading = false }) {
  const { category } = useParams();
  const catDecoded = decodeURIComponent(category || "");
  const baseList = books.filter(b => (b.category || "").toLowerCase() === catDecoded.toLowerCase());

  const cardBooks = baseList.filter(b => b.display === "card");
  const listBooks = baseList.filter(b => b.display === "list");

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

  React.useEffect(() => {
    if (!loading && listBooks.length > 0) {
      listBooks.forEach(b => {
        if (!(b.price > 0)) {
          console.warn(`[Category Debug] List Item ID ${b.id} | "${b.title}" has invalid/missing price: ${b.price}`);
        }
      });
    }
  }, [listBooks, loading]);

  return (
    <Box sx={{ mt: { xs: 1, sm: 6 }, mb: { xs: 2, md: 4 } }}>
      <SEO
        title={catDecoded}
        description={`Browse our collection of books in the ${catDecoded} category.`}
      />
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, sm: 2 },
          fontWeight: 600,
          color: "#56524cff",
          fontSize: { xs: "1.25rem", sm: "2rem" }
        }}
      >
        {catDecoded}
      </Typography>

      {/* Top Section: Cards */}
      <Grid container spacing={{ xs: 0.8, md: 2 }}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
            <Grid key={index} item xs={6} sm={4} md={3}>
              <BookCard loading={true} />
            </Grid>
          ))
          : cardBooks.length > 0 ? cardBooks.map(b => (
            <Grid key={b.id} item xs={6} sm={4} md={3}>
              <BookCard book={b} onAddToCart={addToCart} />
            </Grid>
          )) : (
            // Only show "No books" if BOTH lists are empty
            (!loading && listBooks.length === 0) && (
              <Grid item xs={12}>
                <Typography>No books found in this category.</Typography>
              </Grid>
            )
          )}
      </Grid>

      {/* Bottom Section: List */}
      {!loading && listBooks.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
              More books in this category
            </Typography>
          </Divider>

          <Stack spacing={1.5}>
            {listBooks.map((b) => (
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
                  borderRadius: 3,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
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
                <Box sx={{ flex: 1, minWidth: 0, ml: { xs: 0, md: 2 } }}>
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
                  {b.price > 0 ? (
                    <Typography fontWeight={800} color="success.main" sx={{ fontSize: "1.2rem", minWidth: "80px" }}>
                      ₹{b.price}
                    </Typography>
                  ) : (
                    <Skeleton variant="text" width={60} height={30} animation="wave" />
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
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: 2,
                        px: 4,
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
    </Box>
  );
}
