import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Anime(){
    const {id} = useParams()
    const [anime, setAnime] = useState(null)
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const fetchAnime = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/anime?id=${id}`)
                setAnime(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchAnime();
    }
    , [id]);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/animeGenre?id=${id}`);
              setGenres(response.data);
            } catch (error) {
              console.log(error);
            }
        };
        fetchGenre();
    }
    , [id]);

    return(
        <div className="p-8">
            {anime && (
                <div className="flex">
                    <div className="lg:min-w-[20rem] md:min-w-[18-rem] sm:min-w-48 min-w-40 lg:min-h-[30rem] md:min-h-[26rem] sm:h-48 h-36 m-2 bg-white rounded-lg ">
                        <img src={anime[0].image} alt={anime[0].eng_title} className="w-full h-full" />
                    </div>
                    <div className="p-4">
                        <p className="text-white font-anta text-5xl">{anime[0].eng_title}</p>
                        <p className="text-white font-anta text-3xl">({anime[0].jap_title})</p>
                        <p className="text-white font-anta text-2xl mt-6">Aired: {anime[0].rel_year}</p>
                        <p className="text-white font-anta text-2xl mt-6">Ratings: {anime[0].ratings}</p>
                        <div className="text-white font-anta text-2xl mt-6 flex gap-6">
                            Genres:
                            {genres && genres.map(genre => (
                                <div className="border border-white rounded-full px-2 hover:bg-slate-600">{[genre.genre]}</div>
                            ))}
                        </div>
                        <p className="text-white font-anta text-2xl mt-6 overflow-y-auto max-h-48">{anime[0].description}</p>
                    </div>
                </div>)}
        </div>
    )
}