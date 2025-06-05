import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  AiFillStepBackward,
  AiFillStepForward,
  AiOutlineClose,
} from "react-icons/ai";

import ProgressBar from "./ProgressBar";
import LikeButton from "./LikeButton";
import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";

interface FullPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlay: () => void;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  onSeek: (value: number) => void;
  duration: number;
  currentTime: number;
  volume: number;
  setVolume: (v: number) => void;
  onClose: () => void;
}

const FullPlayer: React.FC<FullPlayerProps> = ({
  song,
  isPlaying,
  onPlay,
  onPlayNext,
  onPlayPrevious,
  onSeek,
  duration,
  currentTime,
  onClose,
}) => {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const imageUrl = useLoadImage(song);

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-t from-purple-300 to-slate-800 flex flex-col items-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-black p-2 rounded-full bg-white/80 hover:scale-110 transition"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Song image */}
        <div className="relative w-full max-w-xl mx-auto mt-16">
          <img
            src={imageUrl || "/images/music-placeholder.png"}
            alt="blur-bg"
            className="absolute inset-0 w-full h-full object-cover opacity-60 blur-2xl rounded-xl z-0"
          />
          <img
            src={imageUrl || "/images/music-placeholder.png"}
            alt="song"
            className="relative z-10 w-[240px] h-[240px] object-cover rounded-xl shadow-lg mx-auto"
          />
        </div>

        {/* Song info + Like */}
        <div className="w-full px-6 mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-black">{song.title}</h1>
            <p className="text-sm text-slate-700">{song.author}</p>
          </div>
          <div className="p-2">
            <LikeButton songId={song.id} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-6 mt-4">
          <ProgressBar
            duration={duration}
            currentTime={currentTime}
            onSeek={onSeek}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-x-6 mt-6">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={36}
            className="text-black cursor-pointer hover:scale-110 transition"
          />
          <div
            onClick={onPlay}
            className="bg-black rounded-full p-3 cursor-pointer hover:scale-110 transition"
          >
            <Icon size={36} className="text-white" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={36}
            className="text-black cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default FullPlayer;
