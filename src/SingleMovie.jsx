import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleMovie() {
  const { id } = useParams();
  const url = `https://moviesapi.ir/api/v1/movies/${id}`;
  const [movie, setMovie] = useState();

  useEffect(() => {
    axios.get(url).then((res) => setMovie(res.data));
  }, [url]);

  console.log(movie);

  return (
    <div>
      <h2>{movie?.title}</h2>
      <img src={movie?.poster} />
    </div>
  );
}

export default SingleMovie;
