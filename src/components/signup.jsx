import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
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
            if(input.name === "" || input.username === "" || input.password === ""){
                alert("Please fill all the fields");
                throw new Error("Please fill all the fields");
            }
            else{
                const response = await axios.post(`http://localhost:5000/signup`, input);
                if(response.status !== 201){
                    alert("Signup failed.Try again");
                    throw new Error("Signup failed.Try again");
                }
                else if(response.status === 400){
                    alert(response.data)
                    throw new Error(response.data);
                }else{
                    alert(response.data);
                    navigate('/login');
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="absolute rounded-lg sm:top-28 top-20 lg:inset-x-40 md:inset-x-32 sm:inset-x-24 inset-x-4 bg-white h-[36rem] p-7">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="name" className="text-black font-anta text-3xl px-3">Name : </label>
                    <input 
                        type="text"
                        name="name"
                        id="signupname"
                        value={input.name}
                        onChange={handleInput}
                        className="border rounded-lg p-3 m-3 font-anta text-2xl" />
                </div>
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="username" className="text-black font-anta text-3xl px-3">UserName : </label>
                    <input 
                        type="text"
                        name="username"
                        id="signupusername"
                        value={input.username}
                        onChange={handleInput}
                        className="border rounded-lg p-3 m-3 font-anta text-2xl" />
                </div>
                <div className="flex flex-col p-2 m-2">
                    <label htmlFor="password" className="text-black font-anta text-3xl px-3">Password : </label>
                    <input 
                        type="password"
                        name="password"
                        id="signuppassword"
                        value={input.password}
                        onChange={handleInput}
                        className="border rounded-lg p-3 m-3 font-anta text-2xl" />
                </div>
                <div className="w-full grid">
                    <button className="justify-self-center w-[30%] font-anta text-black font-bold text-4xl hover:text-white hover:bg-black rounded-xl p-2">Sign Up</button>
                </div>
            </form>
        </div>
    )
}