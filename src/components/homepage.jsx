import Background from "./background";
import Genre from "./genre";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

export default function HomePage() {
  const genres = ["Shounen", "Action", "Sports", "Romance", "Fantasy"];
  const displayGenres = genres.map((genre) => (
    <Genre key={genre} genre={genre} />
  ));

  const [fetchError, setFetchError] = useState(null);
  const [animes, setAnimes] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      const { data, error } = await supabase.from("anime").select();

      if (error) {
        setFetchError("Could not fetch");
        setAnimes(null);
        console.log(error);
      }
      if (data) {
        setAnimes(data);
        setFetchError(null);
      }
    };

    fetchAnimes();
  }, []);

  return (
    <div>
      <Background />
      {displayGenres}

      {/* Displaying the database items */}
      <div>
        {fetchError && <p>{fetchError}</p>}
        {animes && animes.length > 0 ? (
          <div className="flex justify-between p-10">
            {animes.map((anime) => (
              <div key={anime.id} className="border border-black w-96 p-5 text-white text-xl">
                <p className="text-center mb-5">{anime.eng_title}</p>
                <img src={anime.image} alt="anime image" className="w-[200px] m-auto h-[250px]"/>
                <p className="text-center mt-2">{anime.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found!</p>
        )}
      </div>
    </div>
  );
}
