// Axios is imported to make HTTP requests
import axios from 'axios';

// Base URL for Open Library API
const BASE_URL = 'https://openlibrary.org';

// Create a reusable axios instance with base URL and timeout
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// BookService object to handle all book-related API calls
const BookService = {
    /**
     * Smart search for books using Open Library search API
     *  filters - Search filters (q, isbn, first_publish_year)
     *  page - Page number for pagination
     *  limit - Number of results per page
     *  - Books array and total count
     */
    async searchSmart(filters = {}, page = 1, limit = 20) {
        const { q, isbn, first_publish_year } = filters;
        
        try {
            // Make GET request to /search.json with query parameters
            const response = await axiosInstance.get('/search.json', {
                params: {
                    q: q || '', // Query string (required by API)
                    isbn,
                    first_publish_year,
                    page,
                    limit,
                },
            });
            
            // Extract useful data from API response
            const books = (response.data?.docs || []).map((doc) => ({
                id: doc.key,
                title: doc.title,
                authors: doc.author_name || [],
                year: doc.first_publish_year,
                coverUrl: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : null,
                subjects: doc.subject?.slice(0, 3) || [],
            }));
            
            return {
                books,
                total: response.data?.numFound || 0,
            };
            
        } catch (error) {
            // Handle API errors gracefully
            console.error('Error fetching search results:', error);
            return { books: [], total: 0 };
        }
    },
    
    /**
     * Generate Open Library cover image URL by cover ID
     *  coverId - Open Library cover ID
     *  size - Size (S, M, L)
     *  - URL for book cover image
     */
    getCoverImageUrl(coverId, size = 'M') {
        return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    },

    /**
     * Fetch detailed book info from Open Library by work key
     *  workKey - Unique book work key (e.g., "/works/OL12345W")
     * null - Book details (title, description, subjects)
     */
    async getBookDetails(workKey) {
        try {
            const response = await axiosInstance.get(`${workKey}.json`);
            const { description, subjects, title } = response.data;
            
            return {
                title,
                description:
                typeof description === 'string'
                ? description
                : description?.value ?? null,
                subjects: subjects || [],
            };
        } catch (error) {
            // Handle error while fetching book details
            console.error('Error fetching book details:', error);
            return null;
        }
    },
};

// Export BookService for use in other files
export default BookService;
