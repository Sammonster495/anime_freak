import { useEffect, useState } from "react";
import RandomCards from "./randomcards";
import axios from "axios";

export default function Search() {
  const [randomanimes, setRandomAnimes] = useState(null);

  useEffect(() => {
    const fetchRandomAnimes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/search`);
        setRandomAnimes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandomAnimes();
  }, []);

  return (
    <div className="relative">
        <div className="absolute lg:top-12 md:top-10 sm:top-8 top-6 lg:inset-x-16 md:inset-x-14 sm:inset-x-12 inset-x-8 lg:p-5 md:p-4 sm:p-3 p-2 flex justify-between rounded-xl bg-[#0000005c] opacity-75">
            <img src="filter-icon.png" alt="Search" className="lg:h-12 md:h-9 sm:h-6 h-4 transition-transform duration-200 ease-in-out hover:scale-110 " />
            <input type="text" placeholder="Search..." className="lg:w-[80%] md:w-[72%] sm:w-[64%] w-[56%] bg-transparent text-white focus:outline-none lg:text-4xl md:text-2xl sm:text-lg text-sm font-anta" />
            <img src="search-icon.png" alt="Filter" className="lg:h-12 md:h-9 sm:h-6 h-4 rounded-none transition-transform duration-200 ease-in-out hover:scale-110 " />
        </div>
        <div className="absolute lg:top-40 md:top-32 sm:top-24 top-16 lg:inset-x-16 md:inset-x-14 sm:inset-x-12 inset-x-8 lg:p-5 md:p-4 sm:p-3 p-2 block justify-between rounded-xl bg-[#0000005c] opacity-75">
          {randomanimes && randomanimes.map((anime) => (
            <RandomCards key={anime.id} anime={anime} />
          ))}
        </div>
    </div>
  );
}