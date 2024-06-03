import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { checkUser, createUser } from "@/service/services";
import { useUser } from "@/context/UserContext";
import { useMusic } from "@/context/MusicContext";
import { Music } from "@/types/music";
import { useAudio } from "@/context/AudioContext";

import CeloTunesIcon from "@/public/CeloTunes.png";
import { BookmarkMinus } from "lucide-react";

const Playlist = () => {
  const { user, setUser } = useUser();
  const { music, setMusic } = useMusic();
  const { setAudioSrc } = useAudio();
  const router = useRouter();
  const [playlistMusic, setPlaylistMusic] = useState<Music[]>([]);
  const { address, isConnected } = useAccount();

  const handleClick = (music: Music) => {
    setAudioSrc(music);
    router.push(`/music/${music._id}`);
  };

  useEffect(() => {
    if (user && music) {
      const filer = music?.filter((item) => user[0]?.music.includes(item._id));
      setPlaylistMusic(filer);
    }
  }, [user, music]);

  useEffect(() => {
    const checkUserFunction = async () => {
      if (address && isConnected) {
        try {
          const checkUserData = await checkUser(address);
          if (checkUserData) {
            setUser(checkUserData);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    checkUserFunction();
  }, []);

  return (
    <div className="mb-16">
      <div className="mt-8 mb-4">
        <img
          className="w-full h-20 sm:h-40 md:h-48 object-contain"
          src={CeloTunesIcon.src}
          alt="CeloTunesLogo"
        />
      </div>
      {user == null ? (
        <div className="my-8">
          <div className="text-center">..oops you don't have account</div>
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
          <div className="text-center text-lg font-bold text-yellow-600">
            My Playlist
          </div>
          <div className="mt-4 mb-8">
            {playlistMusic !== null &&
              playlistMusic.map((song) => (
                <div
                  key={song._id}
                  className="flex justify-between h-16 border border-solid cursor-pointer"
                  onClick={() => handleClick(song)}
                >
                  <img
                    src={song.image[0].url}
                    alt={song.title}
                    className="w-16 object-cover"
                  />
                  <div className="px-8 p-2 w-1/2 center flex flex-col align-middle">
                    <div className="font-bold text-base truncate">
                      {song.title}
                    </div>
                    <div className="text-sm truncate">{song.name}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-2">
                    <div className="inline-block italic text-sm">remove</div>
                    <div>
                      <BookmarkMinus />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
