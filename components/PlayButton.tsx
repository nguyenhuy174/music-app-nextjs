import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return ( 
    <button
      className="
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-gradient-to-tr
        from-slate-900
        to-slate-600
        p-4 
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
      "
    >
      <FaPlay className="text-cyan-400" />
    </button>
   );
}
 
export default PlayButton;
