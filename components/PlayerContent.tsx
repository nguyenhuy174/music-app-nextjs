"use client";

// @ts-ignore
import useSound from "use-sound";
// @ts-ignore
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import ProgressBar from "./ProgressBar";
import FullPlayer from "./FullPlayer";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    if (!sound) return;

    sound.play();

    const updateTime = () => {
      setCurrentTime(sound.seek() || 0);
      setDuration(sound.duration() || 0);
    };

    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
      sound.unload();
    };
  }, [sound]);

  const handleSeek = (value: number) => {
    sound?.seek(value);
    setCurrentTime(value);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full items-center justify-start h-full">
        <div className="flex items-center gap-x-10">
          <div onClick={() => setIsFullPlayerOpen(true)}>
            <MediaItem data={song} />
          </div>
          <div className="hidden md:block">
            <LikeButton songId={song.id} />
          </div>
        </div>
      </div>

      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
            hidden
            h-full
            md:flex 
            flex-col
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-y-2
          "
      >
        <div className="flex items-center gap-x-6">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-white cursor-pointer hover:scale-125 transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer hover:scale-125 transition"
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-white cursor-pointer hover:scale-125 transition"
          />
        </div>
        <div className="w-full -mt-3">
          <ProgressBar
            duration={duration}
            currentTime={currentTime}
            onSeek={handleSeek}
          />
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer hover:scale-125 transition"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
      {isFullPlayerOpen && (
        <FullPlayer
          song={song}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPlayNext={onPlayNext}
          onPlayPrevious={onPlayPrevious}
          onSeek={handleSeek}
          duration={duration}
          currentTime={currentTime}
          volume={volume}
          setVolume={setVolume}
          onClose={() => setIsFullPlayerOpen(false)}
        />
      )}
    </div>
  );
};

export default PlayerContent;
