import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMovie from "../../components/singlemovie/SingleMovie";
import Custompagination from "../../components/custompagination/Custompagination";
import { Tab, Tabs } from "@material-ui/core";
import "./search.css";

const Search = ({ pinkOn }) => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState(0);
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [numberofpages, setNumberofpages] = useState(1);

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=15a21116c001e1c4675e66aa4fea25b7&language=en-US&query=${searchText}}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumberofpages(data.total_pages);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearch();
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div className="trending-container">
      <form className="heading search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter name or title"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <Tabs
        value={type}
        indicatorColor={pinkOn ? "secondary" : "primary"}
        textColor={pinkOn ? "secondary" : "primary"}
        style={{
          width: "100%",
        }}
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
      >
        <Tab style={{ width: "500px" }} label="Movie results" />
        <Tab style={{ width: "300px" }} label="TV Series results" />
      </Tabs>
      <div className="trending">
        {content.map((c) => (<SingleMovie
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            media={type ? "tv" : "movie"}
            title={c.name || c.title}
            release={c.release_date}
            air={c.first_air_date}
            rating={c.vote_average}
          />
        ))}
        {!content && (type ? <h2>No movies found</h2> : <h2>No series found</h2>)}
      </div>
      {numberofpages > 1 && (
        <Custompagination numberofpages={numberofpages} setPage={setPage} />
      )}
    </div>
  );
};

export default Search;
