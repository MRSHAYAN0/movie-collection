import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [movies, setmovies] = useState();
  const [page, setPage] = useState(1);
  const url = `https://moviesapi.ir/api/v1/movies?page=${page}`;

  useEffect(() => {
    axios.get(url).then((res) => setmovies(res.data.data));
  }, [url]);

  return (
    <>
      <button
        className="bg-amber-400 p-2 m-2 cursor-pointer"
        onClick={() => page > 1 && setPage(page - 1)}
        disabled={page < 1}
      >
        Back
      </button>
      <p>{page}</p>
      <button
        className="bg-amber-400 p-2 m-2 cursor-pointer"
        onClick={() => page < 25 && setPage(page + 1)}
        disabled={page > 25}
      >
        Next
      </button>
      <div className="flex gap-2 flex-wrap justify-center items-center">
        {movies &&
          movies.map((movie, i) => (
            <div key={i} className="w-[20%]">
              <h2>{movie.title}</h2>
              <img src={movie.poster} alt="" />
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
