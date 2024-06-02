import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import MusicUploadForm from "@/components/MusicUploadForm";
import { X } from "lucide-react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

import { getMyMusic } from "@/service/services";
import { Music } from "@/types/music";
import { useAudio } from "@/context/AudioContext";

const Profile = () => {
  const [openForm, setOpenForm] = useState(false);
  const { address, isConnected } = useAccount();
  const [myMusic, setMyMusic] = useState<Music[] | undefined>([]);
  const router = useRouter();
  const { setAudioSrc } = useAudio();

  const handleClick = (music: Music) => {
    setAudioSrc(music);
    router.push(`/music/${music._id}`);
  };

  useEffect(() => {
    const fetchMusic = async () => {
      if (address) {
        try {
          const fetchedMusic = await getMyMusic(address);
          console.log("Fetched music:", fetchedMusic);
          setMyMusic(fetchedMusic);
        } catch (error) {
          console.error("Error fetching music:", error);
        }
      }
    };

    if (isConnected) {
      fetchMusic();
    }
  }, [address, isConnected]);

  console.log("the myMusic is ", myMusic);

  return (
    <div className="justify-center min-h-screen transition-colors duration-300">
      <div className="flex justify-end px-4 py-2">
        <ThemeToggle />
      </div>
      <div className="text-center my-4">
        <h1 className="text-2xl mb-4">Welcome Fraolb</h1>

        <div>
          {openForm ? (
            <div>
              <div className="flex justify-end px-4">
                <button
                  onClick={() => setOpenForm(false)}
                  className="flex text-red-600 border border-red-600 border-solid rounded p-1"
                >
                  Close &nbsp;
                  <X color="#b80000" />
                </button>
              </div>
              <MusicUploadForm />
              <div className="mt-14 ">.</div>
            </div>
          ) : (
            <div className="flex justify-center ">
              <button
                onClick={() => setOpenForm(true)}
                className="border border-solid rounded-md p-2 shadow-md"
              >
                Upload Music
              </button>
            </div>
          )}
        </div>
        <div className="py-4">
          <div className="text-lg font-bold m-4">MY MUSICS</div>
          <div className="m-2">
            {myMusic && myMusic.length > 0 ? (
              myMusic.map((music) => (
                <div
                  key={music._id}
                  className="border shadow py-2 px-2 grid grid-cols-3 items-center rounded-lg my-1"
                  onClick={() => handleClick(music)}
                >
                  <div className="col-span-1">
                    <img
                      src={music.image[0]?.url}
                      alt={`${music.title} cover`}
                      className="w-16 h-12 object-contain rounded"
                    />
                  </div>

                  <div className="col-span-1">
                    <h2 className="text-lg font-semibold mb-2 truncate">
                      {music.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {music.description}
                    </p>
                  </div>

                  <div className="col-span-1 text-right">
                    <p className="text-sm font-medium text-blue-500">
                      {music.genre}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>No music uploaded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
