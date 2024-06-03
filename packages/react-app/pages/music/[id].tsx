import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useAccount } from "wagmi";
import { Music } from "@/types/music";
import { useAudio } from "@/context/AudioContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { useUser } from "@/context/UserContext";
import { Bookmark } from "lucide-react";
import { addToPlaylist } from "@/service/services";

interface PlaylistData {
  address: `0x${string}`;
  musicIds: string;
}
const MusicDetail = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { id } = router.query;
  const { audioSrc, setAudioSrc } = useAudio();
  const subscription = useSubscription();
  const { user, setUser } = useUser();
  const [musicAlreadyAdded, setMusicAlreadyAdded] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [musicData, setMusicData] = useState<Music | null>(null);

  const handleAddToPlaylist = async () => {
    console.log("the id is ", id);
    if (address && id) {
      // Ensure musicIds is a string
      const musicIds = Array.isArray(id) ? id.join(",") : id;
      const playlistData: PlaylistData = {
        address,
        musicIds,
      };
      const data = await addToPlaylist(playlistData);
      if (data) {
        console.log("User data:", data);
        setNotification({ message: "Upload successful!", type: "success" });
        setUser(data);
      } else {
        setNotification({
          message: "Upload failed. Please try again.",
          type: "error",
        });
        console.log("Failed to add to playlist");
      }
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    if (user && subscription) {
      const filer = user[0]?.music?.find((item) => item === id);
      if (filer) {
        setMusicAlreadyAdded(true);
      }
    }
  }, []);

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
      {notification && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
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
      {user == null ? (
        <div className="my-4">
          <div className="text-center">
            You haven&apos;t created an account yet...
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push(`/SignUp/`)}
              className="rounded shadow p-2 m-4 bg-yellow-500 text-white"
            >
              Create Account
            </button>
          </div>
        </div>
      ) : (
        <div>
          {!subscription ? (
            <div className="flex flex-col mt-4 gap-2 items-center">
              <div>Subscribe to listen unlimited</div>
              <div>create a playlist</div>
              <button
                className=" p-1 px-2 m-2 bg-yellow-500 text-white shadow-md rounded-md"
                onClick={() => router.push(`/Subscribe`)}
              >
                Subscribe
              </button>
            </div>
          ) : (
            <div>
              {!musicAlreadyAdded && (
                <div className="flex items-center justify-center gap-2 p-2">
                  <div className="inline-block italic text-md">
                    + save to playlist
                  </div>
                  <Bookmark onClick={() => handleAddToPlaylist()} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicDetail;
