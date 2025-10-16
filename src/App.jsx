// src/App.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Routes, Route, useSearchParams } from "react-router-dom";
import {
  Home,
  Film,
  Star,
  Calendar,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Grid3x3,
  Loader2,
} from "lucide-react";
import GenrePage from "./Genre";

// Movie Card Component
const MovieCard = ({ movie }) => (
  <Link
    to={`/movie/${movie.id}`}
    className="group bg-gray-800/40 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 hover:border-amber-500/50"
  >
    <div className="relative overflow-hidden aspect-[2/3]">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1489599809505-fc6c1e1e8f7a?w=400&h=600&fit=crop";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

      {/* Rating Badge */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-white">
            {movie.imdb_rating || "N/A"}
          </span>
        </div>
      </div>

      {/* Genres Pills */}
      {movie.genres && movie.genres.length > 0 && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {movie.genres.slice(0, 2).map((genre, idx) => (
            <span
              key={idx}
              className="text-xs bg-amber-500/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full font-semibold"
            >
              {genre}
            </span>
          ))}
        </div>
      )}
    </div>

    <div className="p-4">
      <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300 min-h-[3rem]">
        {movie.title}
      </h3>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{movie.year || "نامشخص"}</span>
        </div>
        <span className="bg-gray-700/50 px-2 py-1 rounded-full truncate max-w-[100px]">
          {movie.country || "نامشخص"}
        </span>
      </div>
    </div>
  </Link>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1.5 bg-gray-800/50 backdrop-blur-lg hover:bg-amber-500 text-white hover:text-gray-900 font-semibold py-2 px-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-600 hover:border-amber-400"
      >
        <ChevronRight className="w-4 h-4" />
        <span className="hidden sm:inline">قبلی</span>
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
              pageNum === currentPage
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 shadow-lg"
                : "bg-gray-800/50 text-white hover:bg-gray-700 border border-gray-600"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1.5 bg-gray-800/50 backdrop-blur-lg hover:bg-amber-500 text-white hover:text-gray-900 font-semibold py-2 px-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-600 hover:border-amber-400"
      >
        <span className="hidden sm:inline">بعدی</span>
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [searchWords, setSearchWords] = useState(searchParams.get("q") || "");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(25);
  const [isSearching, setIsSearching] = useState(!!searchParams.get("q"));

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = isSearching
          ? `https://moviesapi.ir/api/v1/movies?q=${searchWords}`
          : `https://moviesapi.ir/api/v1/movies?page=${page}`;

        const response = await axios.get(url);
        setMovies(response.data.data || []);

        if (!isSearching) {
          setTotalPages(response.data.metadata?.page_count || 25);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, isSearching, searchWords]);

  useEffect(() => {
    const params = {};
    if (!isSearching && page > 1) params.page = page.toString();
    if (isSearching && searchWords) params.q = searchWords;
    setSearchParams(params);
  }, [page, searchWords, isSearching, setSearchParams]);

  const handleSearch = () => {
    if (searchWords.trim()) {
      setIsSearching(true);
      setPage(1);
    }
  };

  const clearSearch = () => {
    setSearchWords("");
    setIsSearching(false);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="جستجوی فیلم..."
            value={searchWords}
            onChange={(e) => setSearchWords(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-gray-800/50 backdrop-blur-lg border border-gray-600 text-white pr-12 pl-24 py-4 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-300"
          />
          {searchWords && (
            <button
              onClick={clearSearch}
              className="absolute left-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-5 py-2 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
          >
            جستجو
          </button>
        </div>
      </div>

      {/* Search Results Header */}
      {isSearching && (
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            نتایج جستجو برای "{searchWords}"
          </h2>
          <p className="text-gray-400 mt-2">{movies.length} فیلم یافت شد</p>
        </div>
      )}

      {/* Pagination - Top (only for browse mode) */}
      {!isSearching && !loading && totalPages > 1 && (
        <div className="mb-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Movies Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 mb-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {movies.length === 0 && (
            <div className="text-center py-20">
              <Film className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">
                فیلمی یافت نشد
              </h3>
              <p className="text-gray-500">
                لطفاً عبارت جستجوی خود را تغییر دهید
              </p>
            </div>
          )}
        </>
      )}

      {/* Pagination - Bottom (only for browse mode) */}
      {!isSearching && !loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [genres, setGenres] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://moviesapi.ir/api/v1/genres")
      .then((res) => setGenres(res.data || []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Film className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                MovieDB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
              >
                <Home className="w-4 h-4 group-hover:text-amber-400" />
                <span>خانه</span>
              </Link>

              {/* Genres Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                  <Grid3x3 className="w-4 h-4 group-hover:text-amber-400" />
                  <span>ژانرها</span>
                </button>
                <div className="absolute left-0 top-full mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 max-h-96 overflow-y-auto">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}`}
                      className="block px-4 py-3 hover:bg-gray-700 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 mb-2"
              >
                <Home className="w-4 h-4" />
                <span>خانه</span>
              </Link>
              <div className="px-4 py-2 text-sm text-gray-400 font-semibold">
                ژانرها
              </div>
              <div className="max-h-64 overflow-y-auto">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
