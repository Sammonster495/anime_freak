import Background from "./background";
import Genre from "./genre";

export default function HomePage() {
  const genres = ["Shounen", "Action", "Sports", "Romance", "Isekai"];
  const displayGenres = genres.map((genre) => (
    <Genre key={genre} genre={genre} />
  ));

  return (
    <div>
      <Background />
      {displayGenres}
    </div>
  );
}
