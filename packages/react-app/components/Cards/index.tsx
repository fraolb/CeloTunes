import { useRouter } from "next/router";
import { useAudio } from "@/context/AudioContect";
import { Music } from "@/types/music";

interface CardProps {
  music: Music;
}

const Card: React.FC<CardProps> = ({ music }) => {
  const router = useRouter();
  const { setAudioSrc } = useAudio();

  const handleClick = () => {
    setAudioSrc(music);
    router.push(`/music/${music._id}`);
  };

  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow m-0"
      onClick={handleClick}
    >
      {music !== null && (
        <div>
          <img
            className="w-full h-20 sm:h-40 md:h-48 object-contain"
            src={music?.image[0]?.url}
            alt={`${music.title} cover`}
          />
          <div className="px-2 py-2">
            <div className="font-bold text-sm sm:text-xl mb-2 truncate">
              {music.title}
            </div>
            <p className="text-sm sm:text-base truncate">{music.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
