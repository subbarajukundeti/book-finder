// Displays a responsive grid of book cards.
// Handles three states: loading (skeletons), empty results, or populated results.

import { Grid, Typography, Box, Skeleton } from '@mui/material';
import BookCard from './BookCard';

// Skeleton card placeholder shown while data is loading
function BookSkeletonCard() {
  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
      <Skeleton variant="rectangular" height={280} />
      <Box sx={{ p: 2 }}>
        <Skeleton width="260px" />
        <Skeleton width="260px" />
        <Skeleton width="260px" />
      </Box>
    </Box>
  );
}

export default function BookResultGrid({ books = [], loading }) {
  // ---------- Loading State ----------
  if (loading) {
    return (
      <Grid container spacing={3} justifyContent="center">
        {/* Display 8 skeleton placeholders */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid size={{ xs: 6, md: 2.5, lg: 2.5, xl: 2.5 }} key={i}>
            <BookSkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  // ---------- Empty State ----------
  if (!loading && books.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center', m: 'auto' }}>
        <Typography variant="h6">No books found</Typography>
        <Typography variant="body2" color="text.secondary">
          Try a different title or spelling.
        </Typography>
      </Box>
    );
  }

  // ---------- Results State ----------
  return (
    <Box width="100%">
      <Grid container size={12} spacing={3} justifyContent="center">
        {books.map((book) => (
          <Grid size={{ xs: 6, md: 2.5, lg: 2.5, xl: 2.5 }} key={book.id} display="flex">
            <BookCard
              title={book.title}
              authors={book.authors}
              year={book.year}
              coverUrl={book.coverUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
