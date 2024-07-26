import { useState } from "react";

export default function Card(props){
    const [open, setOpen] = useState(false);
    
    return(
        <div className="relative lg:min-w-48 md:min-w-40 sm:min-w-32 min-w-24 lg:h-72 md:h-60 sm:h-48 h-36 m-2 bg-white rounded-lg ">
            <img src={props.anime.image} alt={props.anime.eng_title} className="absolute w-full h-full rounded-lg"/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" fill="none" x="0px" y="0px" className="absolute top-1 left-0 z-20 h-9"  onClick={(e) => setOpen(!open)}>
                <path fillRule="evenodd" clipRule="evenodd" d="M20 5C20 3.34315 18.6569 2 17 2L7 2C5.34315 2 4 3.34314 4 5L4 21C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L12 18.1518L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21L20 5ZM17 4C17.5523 4 18 4.44772 18 5L18 19.2768L12.4961 16.1318C12.1887 15.9561 11.8113 15.9561 11.5039 16.1318L6 19.2768L6 5C6 4.44771 6.44772 4 7 4L17 4Z" fill="#0088ff" />
                <path fill={`${open?"#0088ff":""}`} d="M19 3L5 3L5 20L12 16L19 20Z" />
            </svg>
        </div>
    );
}
