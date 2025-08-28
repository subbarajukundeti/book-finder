// Header.jsx
// Application header with conditional back button.
// Displays branding (icon + title) always, and shows a back button only when `showBack` is true.

import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 *  showBack - Whether to display the back button (true after search).
 *  onBack - Callback when back button is clicked.
 */
export default function Header({ showBack = false, onBack }) {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box display="flex" alignItems="center" gap={1}>
          {/* Conditionally render back button */}
          {showBack && (
            <IconButton onClick={onBack} color="primary" edge="start">
              <ArrowBackIcon />
            </IconButton>
          )}

          {/* Branding: app icon + title */}
          <MenuBookIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Book Finder
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
