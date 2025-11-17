// src/pages/MediaAndMoments.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia } from "@mui/material";

// Demo carousel images
const carouselImages = [
  "/assets/program1.jpg",
  "/assets/program2.jpg",
  "/assets/program3.jpg",
  "/assets/program4.jpg",
  "/assets/program5.jpg",
];

// Timeline years and demo photos
const years = Array.from({ length: 10 }, (_, i) => 2025 - i);
const photosByYear = years.map((year, idx) => ({
  year,
  images: Array.from({ length: 3 }, (_, i) => `/assets/program${((idx + i) % 5) + 1}.jpg`),
}));

export default function MediaAndMoments() {
  const [currentCarousel, setCurrentCarousel] = useState(0);

  // Carousel auto-switch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 22, mb: 6 }}>
      {/* Carousel */}
      <Box sx={{ mb: 4, position: "relative", overflow: "hidden", borderRadius: 2, height: 300 }}>
        {carouselImages.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`Carousel ${idx}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: `${(idx - currentCarousel) * 100}%`,
              transition: "left 0.8s ease-in-out",
            }}
          />
        ))}
      </Box>

      {/* Photos grouped by year */}
      <Box>
        {photosByYear.map((yearItem) => (
          <Box key={yearItem.year} sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              {yearItem.images.map((img, i) => (
                <Grid item xs={12} sm={4} md={4} key={i}>
                  <Card sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="350"
                      width ="500"
                      image={img}
                      alt={`Year ${yearItem.year}`}
                      sx={{ objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
