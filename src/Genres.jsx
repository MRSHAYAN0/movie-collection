// src/components/Genres.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Film, Star, Calendar, Grid3X3 } from "lucide-react";

const genresList = [
  {
    id: 1,
    name: "Crime",
    color: "from-red-500 to-pink-600",
    icon: "mdi:police-badge",
  },
  {
    id: 2,
    name: "Drama",
    color: "from-blue-500 to-cyan-600",
    icon: "mdi:theater",
  },
  {
    id: 3,
    name: "Action",
    color: "from-orange-500 to-red-600",
    icon: "mdi:explosion",
  },
  {
    id: 4,
    name: "Biography",
    color: "from-emerald-500 to-teal-600",
    icon: "mdi:account-details",
  },
  {
    id: 5,
    name: "History",
    color: "from-amber-500 to-orange-600",
    icon: "mdi:castle",
  },
  {
    id: 6,
    name: "Adventure",
    color: "from-green-500 to-emerald-600",
    icon: "mdi:map-search",
  },
  {
    id: 7,
    name: "Fantasy",
    color: "from-purple-500 to-indigo-600",
    icon: "mdi:dragon",
  },
  {
    id: 8,
    name: "Western",
    color: "from-yellow-500 to-amber-600",
    icon: "mdi:cowboy",
  },
  {
    id: 9,
    name: "Comedy",
    color: "from-lime-500 to-green-600",
    icon: "mdi:emoticon-lol",
  },
  {
    id: 10,
    name: "Sci-Fi",
    color: "from-indigo-500 to-purple-600",
    icon: "mdi:robot-excited",
  },
  {
    id: 11,
    name: "Mystery",
    color: "from-gray-500 to-blue-600",
    icon: "mdi:magnify-expand",
  },
  {
    id: 12,
    name: "Thriller",
    color: "from-rose-500 to-red-600",
    icon: "mdi:ghost",
  },
  {
    id: 13,
    name: "Family",
    color: "from-cyan-500 to-blue-600",
    icon: "mdi:home-heart",
  },
  {
    id: 14,
    name: "War",
    color: "from-stone-500 to-gray-600",
    icon: "mdi:tank",
  },
  {
    id: 15,
    name: "Animation",
    color: "from-pink-500 to-rose-600",
    icon: "mdi:animation-play",
  },
  {
    id: 16,
    name: "Romance",
    color: "from-red-500 to-pink-500",
    icon: "mdi:heart-plus",
  },
  {
    id: 17,
    name: "Horror",
    color: "from-zinc-500 to-gray-800",
    icon: "mdi:skull-crossbones",
  },
  {
    id: 18,
    name: "Music",
    color: "from-violet-500 to-purple-500",
    icon: "mdi:music-clef-treble",
  },
  {
    id: 19,
    name: "Film-Noir",
    color: "from-neutral-500 to-stone-700",
    icon: "mdi:detective",
  },
  {
    id: 20,
    name: "Musical",
    color: "from-fuchsia-500 to-purple-600",
    icon: "mdi:microphone-variant",
  },
  {
    id: 21,
    name: "Sport",
    color: "from-sky-500 to-blue-500",
    icon: "mdi:trophy-award",
  },
];

function Genres() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesByGenre = async (genreId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://moviesapi.ir/api/v1/genres/${genreId}/movies`
      );
      setMovies(response.data.data);
      setSelectedGenre(genresList.find((genre) => genre.id === genreId));
      // Scroll to results
      setTimeout(() => {
        document.getElementById("genre-results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Grid3X3 className="w-10 h-10 text-gray-900" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
              ژانرهای فیلم
            </h1>
            <p className="text-gray-400 text-lg">
              ژانر مورد علاقه خود را انتخاب کنید
            </p>
          </div>

          {/* Genres Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {genresList.map((genre) => (
              <button
                key={genre.id}
                onClick={() => fetchMoviesByGenre(genre.id)}
                className={`bg-gradient-to-br ${genre.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 group relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-white rounded-full"></div>
                </div>

                <div className="text-center relative z-10">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Icon icon={genre.icon} className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-sm leading-tight block">
                    {genre.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {selectedGenre && (
        <div id="genre-results" className="container mx-auto px-4 py-12">
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${selectedGenre.color} rounded-2xl flex items-center justify-center`}
                >
                  <Icon
                    icon={selectedGenre.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">
                    فیلم‌های ژانر {selectedGenre.name}
                  </h2>
                  <p className="text-gray-400 mt-2">
                    بهترین فیلم‌های {selectedGenre.name} برای تماشا
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                  {movies.length} فیلم
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-orange-500 border-b-transparent rounded-full animate-spin animation-delay-500"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-400/10 transition-all duration-500 transform hover:-translate-y-3 border border-gray-700/50 hover:border-amber-400/30"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
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
                        <Film className="w-4 h-4" />
                        مشاهده جزئیات
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && movies.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Icon
                    icon={selectedGenre.icon}
                    className="w-12 h-12 text-gray-400"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">
                  فیلمی در این ژانر یافت نشد
                </h3>
                <p className="text-gray-500">
                  متأسفانه هیچ فیلمی در این ژانر موجود نیست
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Genres;
