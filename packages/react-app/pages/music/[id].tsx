import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface MusicCardProps {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
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
        imageUrl: "https://via.placeholder.com/600/51aa97",
        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${id}.mp3`,
      };
      setMusicData(data);
    }
  }, [id]);

  if (!musicData)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="max-w-lg w-full rounded overflow-hidden shadow-lg">
        <img
          src={musicData.imageUrl}
          alt={musicData.title}
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold mt-4 text-center">
            {musicData.title}
          </h1>
          <p className="text-xl text-center ">{musicData.artist}</p>
        </div>
      </div>
      <div className="w-full mt-4">
        <AudioPlayer
          src={musicData.audioUrl}
          volume={0.5}
          className="rounded"
          customAdditionalControls={[]}
          customVolumeControls={[]}
          layout="stacked"
          style={{
            background: "none",
            color: "white",
            border: "none",
            boxShadow: "none",
          }}
        />
      </div>
    </div>
  );
};

export default MusicDetail;
