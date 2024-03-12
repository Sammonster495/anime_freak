import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <div className="absolute lg:top-12 md:top-10 sm:top-8 top-6 lg:inset-x-16 md:inset-x-14 sm:inset-x-12 inset-x-8 lg:p-4 md:p-3 sm:p-2 p-1 flex justify-between rounded-xl bg-[#0000005c] opacity-75">
            <p className="text-white lg:text-5xl md:text-3xl sm:text-xl text-xs hover:text-white hover:bg-slate-500 rounded-xl font-bold font-anta">AniFreak</p>
            <ul className="flex lg:space-x-20 md:space-x-14 sm:space-x-10 space-x-8">
                <li className="text-purple-400 hover:text-white hover:bg-slate-500 rounded-xl lg:text-5xl md:text-3xl sm:text-xl text-xs font-bold font-anta" ><Link to="/home">Home</Link></li>
                <li className="text-purple-400 hover:text-white hover:bg-slate-500 rounded-xl lg:text-5xl md:text-3xl sm:text-xl text-xs font-bold font-anta" >About</li>
                <li className="text-purple-400 hover:text-white hover:bg-slate-500 rounded-xl lg:text-5xl md:text-3xl sm:text-xl text-xs font-bold font-anta" ><Link to="/team">Team</Link></li>
            </ul>
            <img src="search-icon.png" alt="Search" className="lg:h-14 md:h-10 sm:h-6 h-4 rounded-3xl transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-xl hover:bg-slate-500"/>
        </div>
    )
}