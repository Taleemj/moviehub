import axios from "axios";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";

const Genres = ({
  selectedgenre,
  setSelectedgenre,
  type,
  page,
  setPage,
  pinkOn,
}) => {
  const handleAdd = (genre) => {
    setSelectedgenre([...selectedgenre, genre]);
    setGenres(genres.filter((gen) => gen.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedgenre(selectedgenre.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=15a21116c001e1c4675e66aa4fea25b7&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      // setGenres([]);
    };
  }, []);

  return (
    <div className="genres">
      {selectedgenre.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          varient="outlined"
          color={pinkOn ? "secondary" : "primary"}
          style={{ margin: "5px 10px" }}
          clickable
          size="small"
          onDelete={() => handleRemove(g)}
        />
      ))}
      {genres.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          varient="outlined"
          style={{ margin: "5px 10px" }}
          clickable
          size="small"
          onClick={() => handleAdd(g)}
        />
      ))}
    </div>
  );
};

export default Genres;
