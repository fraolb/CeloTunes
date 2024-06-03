import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Music } from "@/types/music";
import { useAudio } from "@/context/AudioContext";
import { useSubscription } from "@/context/SubscriptionContext";

const MusicDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { audioSrc, setAudioSrc } = useAudio();
  const subscription = useSubscription();

  const [musicData, setMusicData] = useState<Music | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     // Fetch or get the music data based on the ID
  //     const data = {
  //       id: Number(id),
  //       title: `Song Title ${id}`,
  //       artist: `Artist Name ${id}`,
  //       imageUrl: "https://via.placeholder.com/600/51aa97",
  //       audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${id}.mp3`,
  //     };
  //     setMusicData(data);
  //   }
  // }, [id]);

  if (!audioSrc)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="max-w-lg w-full rounded-md overflow-hidden shadow-lg">
        <img
          src={audioSrc.image[0].url}
          alt={audioSrc.title}
          className="w-full h-48 object-contain"
        />
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold mt-4 text-center">
            {audioSrc.title}
          </h1>
          <p className="text-xl text-center ">{audioSrc.name}</p>
        </div>
      </div>
      <div className="w-full mt-4">
        <AudioPlayer
          src={audioSrc.music[0].url}
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
      {!subscription && (
        <div className="flex flex-col mt-4 gap-2 items-center">
          <div>Subscribe to listen unlimited</div>
          <button
            className=" p-1 px-2 m-2 bg-yellow-500 text-white shadow-md rounded-md"
            onClick={() => router.push(`/Subscribe`)}
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicDetail;
