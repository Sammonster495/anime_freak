import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const handleInput = (event) => {
        event.persist();
        setInput({...input, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if(input.username === "" || input.password === ""){
                alert("Please fill all the fields");
                throw new Error("Please fill all the fields");
            }else{
                const response = await axios.post(`${process.env.REACT_APP_BACKEND}/login`, input);
                if(response.status !== 201){
                    alert("Login failed.Try checking your credentials.If the problem persists, try again later.");
                    throw new Error("Login failed.Try checking your credentials.If the problem persists, try again later.");
                }else if(response.status === 400){
                    alert(response.data);
                    throw new Error(response.data);
                }else
                    alert(response.data);
                    navigate('/home');
                }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="absolute rounded-lg sm:top-28 top-20 lg:inset-x-40 md:inset-x-32 sm:inset-x-24 inset-x-4 bg-white h-[36rem] p-7">
            <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="username" className="text-black font-anta text-3xl px-3">UserName : </label>
                    <input 
                        type="text"
                        name="username"
                        id="loginusername"
                        value={input.username}
                        onChange={handleInput}
                        className="border rounded-lg p-3 m-3 font-anta text-2xl" />
                </div>
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="password" className="text-black font-anta text-3xl px-3">Password : </label>
                    <input 
                        type="password"
                        name="password"
                        id="loginpassword"
                        value={input.password}
                        onChange={handleInput}
                        className="border rounded-lg p-3 m-3 font-anta text-2xl" />
                </div>
                <div className="w-full grid">
                    <button className="justify-self-center w-[30%] font-anta text-black font-bold text-4xl hover:text-white hover:bg-black rounded-xl p-2">Login</button>
                </div>
            </form>
        </div>
    )
}