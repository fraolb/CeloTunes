import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useMusic } from "@/context/MusicContext";
import { useAudio } from "@/context/AudioContext";
import { Music } from "@/types/music";

const SearchMusic: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showTrending, setShowTrending] = useState(true);
  const [searchedMusic, setSearchedMusic] = useState<Music[] | null>(null);
  const { music, setMusic } = useMusic();
  const router = useRouter();
  const { setAudioSrc } = useAudio();

  // Function to filter music data based on the search query
  const searchMusic = (query: string) => {
    const search = music.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedMusic(search);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchValue(query);
    setShowTrending(false);
    // Perform search and update music context
    searchMusic(query);
  };

  const handleClick = (music: Music) => {
    setAudioSrc(music);
    router.push(`/music/${music._id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-2">
      <div className="border border-solid flex items-center rounded-md p-2">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search for music..."
          className="flex-1 bg-transparent border-none outline-none"
        />
      </div>
      {showTrending && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Trending Searches</h2>
          <ul className="grid grid-cols-2 gap-2">
            <li className="border border-solid rounded-md p-2">Trending ...</li>
            <li className="border border-solid rounded-md p-2">Lil Man</li>
            <li className="border border-solid rounded-md p-2">Storm</li>
            <li className="border border-solid rounded-md p-2">heart break</li>
          </ul>
        </div>
      )}
      {searchValue !== "" && (
        <div className="mt-4">
          {searchedMusic !== null &&
            searchedMusic.map((song) => (
              <div
                key={song._id}
                className="flex h-16 border border-solid cursor-pointer"
                onClick={() => handleClick(song)}
              >
                <img
                  src={song.image[0].url}
                  alt={song.title}
                  className="w-16 object-cover"
                />
                <div className="px-8 center flex flex-col align-middle">
                  <div className="font-bold text-base truncate">
                    {song.title}
                  </div>
                  <div className="text-sm truncate">{song.name}</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchMusic;
