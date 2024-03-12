import Background from "./background"
import Genre from "./genre"
import supabase from "../config/supabaseClient"
import { useState,useEffect } from "react"

export default function HomePage(){
    const genres = ["Shounen", "Action", "Sports", "Romance", "Fantasy"]
    const displayGenres = genres.map(genre => (
        <Genre key={genre} genre={genre} />
    ))

    const [fetchError,setFetchError]=useState(null)
    const [users,setUsers]=useState(null)

    useEffect(()=>{
        const fetchUsers =async ()=>{
            const {data,error} =await supabase
            .from('genre')
            .select()

            if (error){
                setFetchError('Could not fetch')
                setUsers(null)
                console.log(error)
            }
            if(data){
                setUsers(data)
                setFetchError(null)
            }
        }

        fetchUsers()
    },[])

    return(
        <div>
            <Background />
            {displayGenres}
            <div>
            <h1>My website</h1>
            {fetchError && (<p>{fetchError}</p>)}
            {users && users.length > 0 ? (
  <div>
    {users.map(user => (
      <div key={user.id}> {/* Add a key for each user */}
        <p>{user.id}</p>
        <p>{user.name}</p>
        <hr />
      </div>
    ))}
  </div>
) : (
  <p>No users found!</p>
)}
        </div>
        </div>
    )
}