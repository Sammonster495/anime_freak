import axios from "axios"
import Card from "./card"
import { useEffect, useState } from "react"

export default function Genre(props){
    const [animes, setAnimes] = useState([])

    useEffect(() => {
        const fetchAnime = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/home?genre=${props.genre}`)
                setAnimes(response.data)
                console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchAnime()
    }, [props.genre])

    return(
        <div>
            <h1 className="font-anta font-bold lg:text-4xl md:text-2xl sm:text-xl text-sm text-white ml-4">{props.genre}</h1>
            <div className="flex ">
                {animes && animes.map(anime => (
                <Card key={anime.id} anime={anime} />
                ))}
            </div>
        </div>
    )
}