// Displays a list of sample book queries as clickable buttons.
// Helps users quickly try searches without typing manually.

import { Stack, Typography, Button } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

// Default sample queries (used if no props are provided)
const defaultSamples = [
  "The Great Gatsby",
  "Harry Potter",
  "To Kill a Mockingbird",
  "Pride and Prejudice",
  "The Catcher in the Rye",
];

export default function SampleQueries({ sampleQueries = defaultSamples, onSampleSearch }) {
  // Split sample queries into two rows for better layout
  const firstRow = sampleQueries.slice(0, 3);
  const secondRow = sampleQueries.slice(3);

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      
      {/* Section Header with Icon */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
        <LightbulbIcon fontSize="small" />
        <Typography variant="body2">Try searching for:</Typography>
      </Stack>

      {/* First row of sample buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="center">
        {firstRow.map((sample) => (
          <Button
            key={sample}
            variant="outlined"
            size="small"
            onClick={() => onSampleSearch && onSampleSearch(sample)} // Trigger parent search handler
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "0.9rem",
              px: 2.5,
              py: 0.5,
              color: "black",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
                borderColor: "primary.main",
              },
            }}
          >
            "{sample}"
          </Button>
        ))}
      </Stack>

      {/* Second row of sample buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="center">
        {secondRow.map((sample) => (
          <Button
            key={sample}
            variant="outlined"
            size="small"
            onClick={() => onSampleSearch && onSampleSearch(sample)} // Trigger parent search handler
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "0.9rem",
              px: 2.5,
              py: 0.5,
              color: "black",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
                borderColor: "primary.main",
              },
            }}
          >
            "{sample}"
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
