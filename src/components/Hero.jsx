/**
 * Hero Component
 * --------------
 * Displays the landing section of the application with a background image,
 * overlay, and text headline/subheadline.
 *
 * Props:
 * - onSearch (function): Handler for search input (currently unused here but can be connected to a search box).
 * - loading (boolean): Indicates loading state (reserved for future enhancements like disabling search).
 *
 * Behavior:
 * - Renders a hero banner with background image, dark overlay for readability,
 *   and styled text content.
 * - Uses responsive styling via MUI's sx prop.
 */

import { Box, Typography, Container } from "@mui/material";
import heroImage from "../assets/hero-books.jpg";

export default function Hero({ onSearch, loading }) {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${heroImage})`, // Hero background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: { xs: "60vh", md: "60vh" }, // Consistent hero height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        width: "90%",
        margin: "20px auto",
        borderRadius: "25px", // Rounded corners for modern look
      }}
    >
      {/* Overlay to darken background for better text contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1,
          borderRadius: "25px",
        }}
      />

      {/* Hero content */}
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "white" }}
        >
          Find Your Next <span style={{ color: "#f97316" }}>Great Read</span>
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}
        >
          Discover millions of books from the world&apos;s largest digital library
        </Typography>

        {/* Future place for search bar or call-to-action button */}
      </Container>
    </Box>
  );
}
