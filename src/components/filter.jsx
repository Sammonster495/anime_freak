import { useEffect, useState } from "react";
import axios from "axios";
import { useFilterStore, useGenreStore } from "../store";

export default function Filter() {
  const [genres, setGenres] = useState([]);
  const { toggle } = useFilterStore((state) => state);
  const { fgenre, defaultState, update } = useGenreStore((state) => state);

  useEffect(() => {
    defaultState();
    },[defaultState]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/genre`);
        setGenres(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  });

  return (
    <div className="absolute lg:top-40 md:top-32 sm:top-24 top-16 lg:inset-x-16 md:inset-x-14 sm:inset-x-12 inset-x-8 border-4 border-white bg-slate-700 rounded-2xl">
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 inset-x-0 lg:p-12 md:p-10 sm:p-8 p-6 lg:gap-6 md:gap-5 sm:gap-4 gap-3 rounded-2xl">
      {genres.map((genre, index) => (
          <div key={genre.id} onClick={() => update(genre.id)} className={`lg:text-3xl md:text-2xl sm:text-xl text-lg font-anta lg:p-3 md:p-2 sm:p-1 p-0 justify-self-center border rounded-full w-full truncate text-center ${fgenre[genre.id] ? "border-purple-500 bg-white text-purple-500" : "border-white text-white"}`}>
            {genre.name}
          </div>
        )
      )}
    </div>
    <div className="grid grid-cols-2 pb-8 lg:px-12 md:px-10 sm:px-8 px-6 rounded-xl">
      <div className="text-center justify-self-center text-white font-anta lg:text-4xl md:text-4xl sm:text2xl text-xl border-2 border-white rounded-full w-2/3" onClick={defaultState}>Reset</div>
      <div className="text-center justify-self-center text-purple-500 font-anta lg:text-4xl md:text-4xl sm:text2xl text-xl border-2 border-purple-500 bg-white rounded-full w-2/3" >Apply</div>
    </div>
    </div>
  );
}
