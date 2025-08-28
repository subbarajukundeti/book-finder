/**
 * BookCard Component
 * ------------------
 * Displays a single book in a styled card format.
 * 
 * Features:
 * - Shows book cover (with fallback image on error).
 * - Displays title, author, publication year, and up to 3 subject tags.
 * - Redirects user to a Google search page for more details on click.
 * - Uses Material UI (MUI) for styling and responsiveness.
 */

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Stack,
    Chip,
    CardActionArea,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import heroImage from "../assets/hero-books.jpg";

// Default placeholder image if no cover is provided
const placeholder = heroImage;

export default function BookCard({
    title,
    authors = [],
    year,
    coverUrl,
    subjects = [], 
}) {
    // Use first author if available, otherwise fallback to "Unknown"
    const author = authors.length ? authors[0] : 'Unknown';

    // Redirects to Google search page for book + author(s)
    const handleRedirect = () => {
        const query = encodeURIComponent(`${title} ${authors.join(", ")}`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    };
    
    return (
        // Main container card with hover effects
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                width: "260px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
                },
            }}
        >
            {/* Entire card is clickable → triggers redirect */}
            <CardActionArea onClick={handleRedirect}>
                
                {/* Book Cover Image (fallback to placeholder if missing or error) */}
                <CardMedia
                    component="img"
                    image={coverUrl || placeholder}
                    alt={`${title} cover`}
                    onError={(e) => (e.target.src = placeholder)}
                    sx={{
                        height: 280,
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
                />

                {/* Card content: Title, Author, Year, Tags */}
                <CardContent>
                    <Stack spacing={1}>
                        
                        {/* Book Title */}
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {title}
                        </Typography>

                        {/* Author Row */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {author}
                            </Typography>
                        </Stack>
                        
                        {/* Year Row */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarMonthIcon
                                sx={{ fontSize: 16, color: 'text.secondary' }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {year ?? 'Unknown'}
                            </Typography>
                        </Stack>
                        
                        {/* Subject Chips (limit: 3) */}
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {subjects.slice(0, 3).map((subject) => (
                                <Chip
                                    key={subject}
                                    label={subject}
                                    size="small"
                                    sx={{ borderRadius: 1 }}
                                />
                            ))}
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
