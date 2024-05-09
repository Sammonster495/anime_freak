import { Link } from "react-router-dom";

export default function Intro(){
    return(
        <div className="relative w-full">
            <img src="bg-image.jpg" alt="Anime Freak" className="w-full h-[46rem] opacity-50 lg:blur-sm md:blur-[3px] sm:blur-[2px] blur-[1px]"/>
            <div className="absolute inset-x-0 sm:top-32 top-24 m-auto flex flex-col items-center sm:h-3/6 h-2/6">
                <p className="text-2xl font-bold lg:text-5xl md:text-4xl sm:text-3xl text-white font-anta">Welcome to Anime Freak</p>
                <img src="logo.jpg" alt="Logo" className="inset-0 top-0 m-auto rounded-full lg:h-60 md:h-44 sm:h-28 h-20 hover:scale-110 transition cursor-pointer"/>
                <p className="text-sm font-bold lg:text-2xl md:text-xl sm:text-lg text-white font-anta">Your one stop destination for all things anime</p>
            </div>
            <div className="absolute sm:grid grid-cols-2 text-center sm:w-1/3 sm:bottom-[16%] bottom-[30%] sm:mx-[33%] ml-[39%] lg:gap-36 md:gap-28 sm:gap-20 h-12">
                <Link to="/login">
                    <div className="bg-white rounded-lg grid sm:m-0 my-4">
                        <p className="md:text-2xl text-xl font-anta font-bold text-purple-500 self-center">Login</p>
                    </div>
                </Link>
                <Link to="/signup">
                    <div className="bg-white rounded-lg grid sm:m-0 my-4">
                        <p className="md:text-2xl text-xl font-anta font-bold text-purple-500 self-center">Sign Up</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}