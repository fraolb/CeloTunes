interface MusicCardProps {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

import { useRouter } from "next/router";
import { useAudio } from "@/context/AudioContect";

const Card: React.FC<MusicCardProps> = ({
  id,
  title,
  artist,
  imageUrl,
  audioUrl,
}) => {
  const router = useRouter();
  const { setAudioSrc } = useAudio();

  const handleClick = () => {
    setAudioSrc({ id, title, artist, imageUrl, audioUrl });
    router.push(`/music/${id}`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg  m-0"
      onClick={() => handleClick()}
    >
      <img
        className="w-full h-20 sm:h-40 md:h-48 object-cover"
        src={imageUrl}
        alt={`${title} cover`}
      />
      <div className="px-2 py-2">
        <div className="font-bold text-sm sm:text-xl mb-2 truncate">
          {title}
        </div>
        <p className="text-gray-700 font-bold  text-sm sm:text-base truncate">
          {artist}
        </p>
      </div>
      {/* <div className="px-6 pt-4 pb-2">
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play
        </button>
      </div> */}
    </div>
  );
};

export default Card;
