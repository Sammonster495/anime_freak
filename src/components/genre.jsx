import axios from "axios"
import Card from "./card"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Genre(props){
    const [animes, setAnimes] = useState(null)

    useEffect(() => {
        const fetchAnime = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/home?genre=${props.genre}`)
                setAnimes(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchAnime()
    }, [props.genre])

    return(
        <>
            <h1 className="font-anta font-bold lg:text-4xl md:text-2xl sm:text-xl text-sm text-white ml-4">{props.genre}</h1>
            <div className="flex overflow-x-auto">
                {animes && animes.map(anime => (
                <Link key={anime.id} to={`/anime/${anime.id}`}><Card key={anime.id} anime={anime} /></Link>
                ))}
            </div>
        </>
    )
}