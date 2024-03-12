import Navbar from "./navbar";

export default function Background(){
    
    return(
            <div className="relative w-full">
                <img src="bg-image.jpg" alt="Anime Freak" className="w-full h-2/6 opacity-50 lg:blur-sm md:blur-[3px] sm:blur-[2px] blur-[1px]"/>
                <img src=".jpg" alt="Logo" className="absolute inset-0 m-auto rounded-full lg:h-60 md:h-44 sm:h-24 h-16"/>
                <Navbar />
            </div>
    );
}