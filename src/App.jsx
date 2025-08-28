/*
 * Main entry component for the Book Finder application.
 * Handles search logic, manages global state (books, loading, pagination), 
 * and controls whether to show the home page or search results.
 *
 */

import { useState,useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookService from "./services/BookService";
import { Container, Box, Alert } from "@mui/material";
import SearchBar from "./components/SearchBar";
import AnimatedIcon from "./components/AnimatedIcon";
import SampleQueries from "./components/SampleQueries";
import Footer from "./components/Footer";
import BookResultGrid from "./components/ResultBooksGrid";
import BookCount from "./components/BookCount";
import Pagination from "@mui/material/Pagination";

export default function App() {

  /*
   *---------- State Management ----------
   */
  
 const [books, setBooks] = useState([]);                          // Stores fetched book results
  const [loading, setLoading] = useState(false);                  // Loading state for API requests
  const [searchPerformed, setSearchPerformed] = useState(false);  // Tracks whether a search was performed
  const [lastQuery, setLastQuery] = useState("");                 // Stores last search query
  const [totalResults, setTotalResults] = useState(0);            // Total number of results from API
  const [currentPage, setCurrentPage] = useState(1);              // Pagination current page
  const RESULTS_PER_PAGE = 20;                                    // Number of results to display per page

  // Scroll to top when a new search is performed  
  useEffect(() => {
    if (searchPerformed) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchPerformed]);

  // ---------- Handlers ----------
  /**
   * Handles search requests by calling BookService with given query and page.
   * Supports filtering by year if the query matches a 4-digit number.
   */
  
  const handleSearch = async (queryText, page = 1) => {
    const query = queryText.trim();
    if (!query) return;
    
    //Update state before request processing

    setLoading(true);
    setSearchPerformed(true);
    setCurrentPage(page);
    setLastQuery(query);
    
    //Filters for API call
    const filters = {
      q: query, 
    };
    if (/^\d{4}$/.test(query)) {                //Year based search
      filters.first_publish_year = query;
    }
    
    try {
      //calling bookservice to fetch the book results
      const { books, total } = await BookService.searchSmart(filters, page, RESULTS_PER_PAGE);
      setBooks(books);
      setTotalResults(total);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };
  
  //resets the state to default when user clicks on Back
  const handleBack = () => {
    setSearchPerformed(false);
    setBooks([]);
    setLastQuery("");
  };
  
  return (
    //conditional rendering of book result page and home page 
    <>
    {searchPerformed ? (
      <>
        <Header showBack={true} onBack={handleBack} />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Box sx={{ width: { xs: "100%", sm: "70%", md: "50%" } }}>
              <SearchBar
              onSearch={handleSearch}
              loading={loading}
              variant="hero"
              />
            </Box>
          </Box>
          <BookCount total={totalResults} query={lastQuery} />
        </Container>
        <BookResultGrid books={books} loading={loading} />
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
          count={Math.ceil(totalResults / RESULTS_PER_PAGE)}
          page={currentPage}
          onChange={(e, page) => handleSearch(lastQuery, page)}
          color="primary"
          />
        </Box>
      </>
    ) : (
      //home page rendering
      <>
      <Header />
      <Hero onSearch={handleSearch} loading={loading} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Box sx={{ width: { xs: "100%", sm: "70%", md: "50%" } }}>
          <SearchBar
          onSearch={handleSearch}
          loading={loading}
          variant="hero"
          />
        </Box>
      </Box>
      <AnimatedIcon />
      <SampleQueries onSampleSearch={handleSearch} />
      </>
    )}
    <Footer />
    </>
  );
}
