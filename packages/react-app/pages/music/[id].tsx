import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface MusicCardProps {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
}

const MusicDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [musicData, setMusicData] = useState<MusicCardProps | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch or get the music data based on the ID
      const data = {
        id: Number(id),
        title: `Song Title ${id}`,
        artist: `Artist Name ${id}`,
        imageUrl: "https://via.placeholder.com/150",
      };
      setMusicData(data);
    }
  }, [id]);

  if (!musicData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <img
        src={musicData.imageUrl}
        alt={musicData.title}
        className="w-full h-48 object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{musicData.title}</h1>
      <p className="text-xl">{musicData.artist}</p>
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
        volume={0.5}
        // Try other props!
      />
    </div>
  );
};

export default MusicDetail;
