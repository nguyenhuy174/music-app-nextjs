"use client";

import { TbPlaylist } from "react-icons/tb";
import { BiUpload } from "react-icons/bi";

import { Song } from "@/types";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const { user, subscription } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // if (!subscription) {
    //   return subscribeModal.onOpen();
    // }

    return uploadModal.onOpen();
  }

  return ( 
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-cyan-500" size={26} />
          <p className="text-cyan-200 font-medium text-md">
            Music Library
          </p>
        </div>
        <BiUpload 
          onClick={onClick} 
          size={24} 
          className="
            text-cyan-500 
            cursor-pointer 
            hover:text-white 
            hover:scale-110
            transition
          "
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem 
            onClick={(id: string) => onPlay(id)} 
            key={item.id} 
            data={item}
          />
        ))}
      </div>
    </div>
   );
}
 
export default Library;