// src/GenrePage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  Star,
  Calendar,
  Film,
  Grid3x3,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

// Main Genre Page Component
function GenrePage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreName, setGenreName] = useState("");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://moviesapi.ir/api/v1/genres/${id}/movies?page=${page}`
        );
        setMovies(response.data.data || []);
        setTotalPages(response.data.metadata?.page_count || 1);

        // Get genre name from API
        const genresResponse = await axios.get(
          "https://moviesapi.ir/api/v1/genres"
        );
        const genre = genresResponse.data.find((g) => g.id === parseInt(id));
        setGenreName(genre?.name || "ژانر");
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [id, page]);

  useEffect(() => {
    if (page > 1) {
      setSearchParams({ page: page.toString() });
    } else {
      setSearchParams({});
    }
  }, [page, setSearchParams]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Genre Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-lg px-6 py-3 rounded-2xl border border-gray-700 shadow-xl">
          <Grid3x3 className="w-6 h-6 text-amber-400" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {genreName}
          </h1>
        </div>
        <p className="text-gray-400 mt-3">
          {loading ? "در حال بارگذاری..." : `${movies.length} فیلم در این صفحه`}
        </p>
      </div>

      {/* Pagination - Top */}
      {!loading && totalPages > 1 && (
        <div className="mb-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 mb-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* No Results */}
          {movies.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
                <Film className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">
                فیلمی یافت نشد
              </h3>
              <p className="text-gray-500 mb-6">در این ژانر فیلمی موجود نیست</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                بازگشت به خانه
              </Link>
            </div>
          )}

          {/* Pagination - Bottom */}
          {totalPages > 1 && movies.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GenrePage;
