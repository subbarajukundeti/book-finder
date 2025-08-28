/**
 * Footer Component
 * ----------------
 * A simple footer section displayed at the bottom of the application.
 * - Uses MUI's Box and Container for layout and styling.
 * - Displays a short message with branding.
 * - Keeps consistent spacing and theme-based colors.
 */

import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    // Wrapper for footer section
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",     
        bgcolor: "action.hover",    
        mt: 8,                      
        py: 4,                      
      }}
    >
      <Container maxWidth="lg">
        {/* Centered footer text */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          Built with ❤️ for book lovers by{" "}
          <span style={{ fontWeight: "bold", color: "red" }}>
            Aganitha Cognito Solutions
          </span>
        </Typography>
      </Container>
    </Box>
  );
}
