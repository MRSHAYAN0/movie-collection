// src/components/SingleMovie.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar, MapPin, Film, Clock } from "lucide-react";

function SingleMovie() {
  const { id } = useParams();
  const url = `https://moviesapi.ir/api/v1/movies/${id}`;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-orange-500 border-b-transparent rounded-full animate-spin animation-delay-500"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">فیلم یافت نشد</h2>
          <Link to="/" className="bg-amber-500 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-lg hover:bg-amber-500 text-white hover:text-gray-900 px-6 py-3 rounded-xl font-bold transition-all duration-300 border border-gray-600 hover:border-amber-400 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          بازگشت
        </Link>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700/50">
          <div className="lg:flex">
            {/* Poster */}
            <div className="lg:w-2/5 p-8">
              <div className="relative group">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1489599809505-fc6c1e1e8f7a?w=600&h=800&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-3/5 p-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              {/* Rating and Basic Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">IMDb: {movie.imdb_rating || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-xl">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span className="font-bold">{movie.year || "نامشخص"}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-xl">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="font-bold">{movie.country || "نامشخص"}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span className="font-bold">{movie.runtime} دقیقه</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Film className="w-5 h-5 text-amber-400" />
                    ژانرها
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plot */}
              {movie.plot && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-amber-400">خلاصه داستان</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {movie.plot}
                  </p>
                </div>
              )}

              {/* Actors */}
              {movie.actors && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-amber-400">بازیگران</h3>
                  <p className="text-gray-300">{movie.actors}</p>
                </div>
              )}

              {/* Director */}
              {movie.director && (
                <div>
                  <h3 className="text-xl font-bold mb-2 text-amber-400">کارگردان</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;