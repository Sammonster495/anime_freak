import axios from "axios"
import Card from "./card"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useProfileStore } from "../store"

export default function Genre(props){
    const [animes, setAnimes] = useState(null)
    const setProfile = useProfileStore(state => state.setData)
    let watch = Cookies.get('watchlist')
    let s1 = Cookies.get('firstname')
    let s2 = Cookies.get('lastname')
    setProfile([s1[0], s2[0]])
    let watchlist
    if (watch && watch.startsWith('j:')) {
        watch = watch.substring(2);
        watchlist = JSON.parse(watch)
    }

    useEffect(() => {
        const fetchAnime = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND}/home?genre=${props.genre}`, {
                    withCredentials: true,
                })
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
                <Link key={anime.id} to={`/anime/${anime.id}`}><Card key={anime.id} anime={anime} watchlist={watchlist} /></Link>
                ))}
            </div>
        </>
    )
}