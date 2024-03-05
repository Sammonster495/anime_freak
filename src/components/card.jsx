export default function Card(props){
    return(
        <div className="lg:w-48 md:w-40 sm:w-32 w-24 lg:h-72 md:h-60 sm:h-48 h-36 m-2 bg-white rounded-lg ">
            <img src={props.anime.image} alt={props.anime.eng_title} className="w-full h-full rounded-lg"/>
        </div>
    );
}