// src/App.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Icon } from "@iconify/react";
import Genres from "./Genres";
import SingleMovie from "./SingleMovie";
import { Home, Film, Star, Calendar } from "lucide-react";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchWords, setSearchWords] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(25);

  const url = `https://moviesapi.ir/api/v1/movies?page=${page}`;
  const searchUrl = `https://moviesapi.ir/api/v1/movies?q=${searchWords}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.data);
        setTotalPages(res.data.metadata?.last_page || 25);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url]);

  const handleSearch = () => {
    if (searchWords.trim()) {
      setLoading(true);
      axios
        .get(searchUrl)
        .then((res) => {
          setMovies(res.data.data);
          setPage(1);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  const clearSearch = () => {
    setSearchWords("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon icon="mdi:movie-open" className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                MovieDB
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
              >
                <Home className="w-4 h-4 group-hover:text-amber-400" />
                <span>خانه</span>
              </Link>
              <Link
                to="/genres"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
              >
                <Icon
                  icon="mdi:shape"
                  className="w-4 h-4 group-hover:text-amber-400"
                />
                <span>ژانرها</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="جستجوی فیلم مورد نظر..."
              value={searchWords}
              onChange={(e) => setSearchWords(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-gray-800/50 backdrop-blur-lg border border-gray-600 text-white px-12 py-4 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all duration-300"
            />
            {searchWords && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Icon icon="mdi:close" className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-6 py-1 rounded-full font-bold hover:shadow-lg hover:shadow-amber-400/25 transition-all duration-300"
            >
              جستجو
            </button>
          </div>
        </div>

        {/* Pagination */}
        {!searchWords && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg hover:bg-amber-500 text-white hover:text-gray-900 font-bold py-3 px-6 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-600 hover:border-amber-400"
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page <= 1}
            >
              <Icon icon="mdi:chevron-right" className="w-5 h-5" />
              <span>قبلی</span>
            </button>

            <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg px-6 py-3 rounded-xl border border-gray-600">
              <Icon icon="mdi:calendar" className="w-5 h-5 text-amber-400" />
              <span className="font-bold">
                صفحه {page} از {totalPages}
              </span>
            </div>

            <button
              className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg hover:bg-amber-500 text-white hover:text-gray-900 font-bold py-3 px-6 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-600 hover:border-amber-400"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              <span>بعدی</span>
              <Icon icon="mdi:chevron-left" className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-orange-500 border-b-transparent rounded-full animate-spin animation-delay-500"></div>
            </div>
          </div>
        ) : (
          <>
            {searchWords && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  نتایج جستجو برای "{searchWords}"
                </h2>
                <p className="text-gray-400 mt-2">
                  {movies.length} فیلم یافت شد
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-400/10 transition-all duration-500 transform hover:-translate-y-3 border border-gray-700/50 hover:border-amber-400/30"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1489599809505-fc6c1e1e8f7a?w=400&h=500&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold">
                          {movie.imdb_rating || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                      {movie.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{movie.year || "نامشخص"}</span>
                      </div>
                      <span className="bg-gray-700/50 px-3 py-1 rounded-full">
                        {movie.country || "نامشخص"}
                      </span>
                    </div>

                    <Link
                      to={`/movie/${movie.id}`}
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-gray-900 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-400/25"
                    >
                      <Icon icon="mdi:play" className="w-4 h-4" />
                      مشاهده جزئیات
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {movies.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Icon
                    icon="mdi:movie-search"
                    className="w-12 h-12 text-gray-400"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  فیلمی یافت نشد
                </h3>
                <p className="text-gray-500">
                  لطفاً عبارت جستجوی خود را تغییر دهید
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
