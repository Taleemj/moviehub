import React, { useState, useEffect } from "react";
import axios from "axios";
import "./trending.css";
import SingleMovie from "../../components/singlemovie/SingleMovie";
import Custompagination from "../../components/custompagination/Custompagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key={api_key}&page=${page}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <div className="trending-container">
        <div className="heading">Trending</div>
        <div className="sub-heading">Most Popular Today</div>
        <div className="trending">
          {content.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              media={movie.media_type}
              title={movie.name || movie.title}
              release={movie.release_date}
              air={movie.first_air_date}
              rating={movie.vote_average}
            />
          ))}
        </div>
        <Custompagination setPage={setPage} page={page} />
      </div>
    </div>
  );
};

export default Trending;
