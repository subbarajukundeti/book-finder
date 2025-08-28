// SearchBar.jsx
// A reusable search input component with submit button.
// Supports two variants: "default" (flat) and "hero" (highlighted style).
// Triggers the parent-provided onSearch function when submitted.

import { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function SearchBar({ onSearch, loading, variant = "default" }) {
  // ---------- Local State ----------
  const [value, setValue] = useState(""); // Holds current search input value

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (q) onSearch(q); // Trigger parent callback only if query is non-empty
  };

  const isHero = variant === "hero"; // Used for styling (rounded vs normal)

  // ---------- Render ----------
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={isHero ? 4 : 0} // Hero style has slight shadow
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: isHero ? "50px" : 1,
        overflow: "hidden",
      }}
    >
      {/* Input field */}
      <TextField
        fullWidth
        placeholder="Search by title, author, year or ISBN"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MenuBookIcon color="primary" />
            </InputAdornment>
          ),
          sx: { border: "none" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { border: "none" }, // Remove default border
            "&:hover fieldset": { border: "none" },
            "&.Mui-focused fieldset": { border: "none" },
          },
        }}
      />

      {/* Submit button */}
      <Button
        type="submit"
        variant="text"
        color="primary"
        disabled={loading}
        startIcon={<SearchIcon />}
        sx={{
          borderRadius: 5,
          px: 5,
          fontWeight: "bold",
        }}
      >
        Search
      </Button>
    </Paper>
  );
}
