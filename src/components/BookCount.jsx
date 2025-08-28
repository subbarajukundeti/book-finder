/**
 * BookCount Component
 * -------------------
 * Displays the number of books found for a given search query.
 *
 * Props:
 * - total (number): The total count of search results.
 * - query (string): The search term entered by the user.
 *
 * Behavior:
 * - If no total or query is provided, the component returns null (renders nothing).
 * - Otherwise, it shows a styled message with the result count.
 */

import { Typography, Box } from '@mui/material';

export default function BookCount({ total, query }) {
  // Do not render if search hasn't been performed yet
  if (!total || !query) return null;

  return (
    <Box 
      sx={{ 
        mt: 2,   // Top margin for spacing from header
        mb: 3,   // Bottom margin for spacing from results
        px: 2,   // Horizontal padding for consistent layout
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary" 
        align="center"
      >
        Found {total} books for "<strong>{query}</strong>"
      </Typography>
    </Box>
  );
}
