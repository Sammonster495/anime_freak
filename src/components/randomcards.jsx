export default function RandomCards(props){
    return(
        <div className="flex">
            <div className="lg:w-40 md:w-32 w-20 lg:h-48 md:h-36 h-24 m-2 bg-white rounded-lg ">
                <img src={props.anime.image} alt={props.anime.eng_title} className="w-full h-full rounded-lg"/>
            </div>
            <div className="p-2 relative ">
                <h1 className="font-anta font-semibold lg:text-3xl md:text2xl sm:text-xl text-lg text-white">{props.anime.eng_title}</h1>
                <p className="text-white font-anta lg:text-2xl">{props.anime.description}</p>
            </div>
        </div>
    );
}