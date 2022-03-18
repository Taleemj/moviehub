const useGenres = (selectedgenre) => {
  if (selectedgenre < 1) return "";

  const GenresId = selectedgenre.map((g) => g.id);
  return GenresId.reduce((acc, curr) => acc + "," + curr);
};

export default useGenres