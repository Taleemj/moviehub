import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMovie from "../../components/singlemovie/SingleMovie";
import Custompagination from "../../components/custompagination/Custompagination";
import Genres from "../../components/Genres";
import useGenres from "../../hooks/useGenre";

const Tv = ({ pinkOn }) => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberofpages, setNumberofpages] = useState();
  const [selectedgenre, setSelectedgenre] = useState([]);
  const genreforURL = useGenres(selectedgenre);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=15a21116c001e1c4675e66aa4fea25b7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumberofpages(data.total_pages);
  };
  useEffect(() => {
    fetchSeries();
  }, [page, genreforURL]);

  return (
    <div>
      <div className="trending-container">
        <div className="heading">tv series</div>
        <div className="sub-heading">
          select Genres
          <Genres
            selectedgenre={selectedgenre}
            setSelectedgenre={setSelectedgenre}
            page={page}
            setPage={setPage}
            pinkOn={pinkOn}
          />
        </div>
        <div className="trending">
          {content.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              media='tv'
              title={movie.name || movie.title}
              release={movie.release_date}
              air={movie.first_air_date}
              rating={movie.vote_average}
            />
          ))}
        </div>
        <Custompagination numberofpages={numberofpages} setPage={setPage} />
      </div>
    </div>
  );
};

export default Tv;
