import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Anime(){
    const {id} = useParams()
    const [anime, setAnime] = useState(null)
    const [genres, setGenres] = useState([])
    const [content, setContent] = useState([])
    const [charvas, setCharVas] = useState([])

    useEffect(() => {
        const fetchGenre = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_BACKEND}/animeGenre?id=${id}`);
              setGenres(response.data);
            } catch (error) {
              console.log(error);
            }
        };
        const fetchAnime = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/anime?id=${id}`)
                setAnime(response.data)
            }catch(error){
                console.log(error)
            }
        }
        const fetchContent = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/animeContent?id=${id}`)
                setContent(response.data)
            }catch(error){
                console.log(error)
            }
        }
        const fetchCharacter = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/animeCharacter?id=${id}`)
                setCharVas(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchAnime();
        fetchGenre();
        fetchContent();
        fetchCharacter();
    }
    , [id, charvas]);

    const handleClick = async (event) => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/watchlist?id=${id}`, {
                withCredentials: true
            })
            if(response.status === 201)
                alert(response.data)
            else
                alert(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="lg:p-8 md:p-6 sm:p-4 p-2">
            {anime && (
                <div className="md:flex">
                    <div className="w-full grid">
                        <div className="lg:min-w-[20rem] md:min-w-[17rem] sm:min-w-48 w-[75%] lg:min-h-[30rem] md:h-[24rem] sm:min-h-64 min-h-48 m-2 md: bg-white rounded-lg justify-self-center">
                            <img src={anime[0].image} alt={anime[0].eng_title} className="w-full h-full" onDoubleClick={handleClick} />
                        </div>
                    </div>
                    <div className="lg:p-4 md:p-3 sm:p-2 p-1">
                        <p className="text-white font-anta lg:text-5xl md:text-4xl sm:text-3xl text-2xl">{anime[0].eng_title}</p>
                        <p className="text-white font-anta lg:text-3xl md:text-2xl sm:text-xl text-lg">({anime[0].jap_title})</p>
                        <div className="sm:flex lg:gap-20 md:gap-16 sm:gap-12">
                            <p className="text-white font-anta lg:text-2xl md:text-xl sm:text-lg text-md lg:mt-6 md:mt-4 sm:mt-2 mt-2">Aired: {anime[0].rel_year}</p>
                            <p className="text-white font-anta lg:text-2xl md:text-xl sm:text-lg text-md lg:mt-6 md:mt-4 sm:mt-2 mt-2">Ratings: {anime[0].ratings}</p>
                        </div>
                        <div className="text-white font-anta lg:text-2xl md:text-xl sm:text-lg text-md lg:mt-6 md:mt-5 sm:mt-3 mt-1 flex gap-6">
                            Studios:
                            {anime && anime.map(a => (
                                <div className="border border-white rounded-full px-2 hover:bg-slate-600">{[a.studios]}</div>
                            ))}
                        </div>
                        <div className="text-white font-anta lg:text-2xl md:text-xl sm:text-lg text-md lg:mt-6 md:mt-5 sm:mt-3 mt-1 sm:flex lg:gap-5 md:gap-4 sm:gap-3 gap-2 grid grid-cols-4">
                            Genres:
                            {genres && genres.map(genre => (
                                <div className="border border-white rounded-full px-2 hover:bg-slate-600 truncate text-center">{[genre.genre]}</div>
                            ))}
                        </div>
                        <p className="text-white font-anta lg:text-2xl md:text-xl sm:text-lg text-md mt-6 overflow-y-auto lg:max-h-48 md:max-h-[7rem] sm:max-h-[10rem] max-h-[7rem]">{anime[0].description}</p>
                    </div>
                </div>)}
            <div>
                <p className="text-white font-anta lg:text-5xl md:text-4xl sm:text-3xl text-2xl px-2 mt-6">Content</p>
                <div className="sm:grid grid-cols-4 my-6">
                    {content && content.map(c => (
                        <div className="md:h-24 sm:h-20 h-12 m-2 bg-white rounded-lg grid" key={c.name}>
                            <a className="text-purple-700 font-anta lg:text-2xl md:text-xl sm:text-lg text-md self-center justify-self-center" href={c.link}><p className="text-center">{c.name}</p></a>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-white font-anta lg:text-5xl md:text-4xl sm:text-3xl text-2xl px-2 mt-6">Characters & Voice Actos</p>
                <div className="sm:grid grid-cols-2 lg:gap-12 md:gap-10 sm:gap-8 p-6">
                    {charvas && charvas.map(cva => (
                        <div className="flex justify-between sm:border border-white rounded-xl lg:h-48 md:h-40 sm:h-32 h-24">
                            <div className="basis-2/5">
                                <div className="grid">
                                    <img src={cva.c_image} alt={cva.name} className="lg:w-40 md:w-32 sm:w-24 w-16 lg:h-40 md:h-32 sm:h-24 h-16 rounded-full object-cover justify-self-center" />
                                </div>
                                <p className="text-white font-anta lg:text-xl md:text-[1rem] sm:text-sm text-xs text-center">{cva.name}</p>
                            </div>
                            <div className="basis-2/5">
                                <div className="grid">
                                    <img src={cva.va_image} alt={cva.va} className="lg:w-40 md:w-32 sm:w-24 w-16 lg:h-40 md:h-32 sm:h-24 h-16 rounded-full object-cover justify-self-center" />
                                </div>
                                <p className="text-white font-anta lg:text-xl md:text-[1rem] sm:text-sm text-xs text-center">{cva.va}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
        </div>
    )
}