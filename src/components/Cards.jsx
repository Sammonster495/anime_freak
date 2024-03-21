export default function Cards(props){
    return(
        <div className="grid md:grid-cols-4 sm:grid-cols-7 grid-cols-9 lg:p-4 md:p-3 sm:p-2 p-1 transition-transform duration-200 ease-in-out hover:scale-[1.03]">
            <div className="rounded-lg lg:w-[12rem] md:w-[10rem] sm:w-[8rem] w-[6rem] aspect-square md:col-span-1 sm:col-span-2 col-span-4">
                <img src={props.anime.image} alt={props.anime.eng_title} className=" rounded-lg  object-fill"/>
            </div>
            <div className="md:p-2 sm:p-1 p-0 md:col-span-3 sm:col-span-5 col-span-5">
                <h1 className="font-anta font-semibold truncate max-w-fit overflow-x-hidden lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white">{props.anime.eng_title}</h1>
                <h3 className="text-white font-anta lg:text-2xl md:text-xl sm:text-lg text-md lg:pt-6 md:pt-5 sm:pt-4 pt-3 md:line-clamp-5 sm:line-clamp-4 line-clamp-3">{props.anime.description}</h3>
            </div>
        </div>
    );
}