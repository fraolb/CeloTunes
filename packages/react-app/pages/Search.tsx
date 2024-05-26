import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/router";

const SearchMusic: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showTrending, setShowTrending] = useState(true);

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    // Hide trending when user starts typing
    setShowTrending(false);
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
            {/* Trending search items */}
            <li className="border border-solid rounded-md p-2">
              Trending Search 1
            </li>
            <li className="border border-solid rounded-md p-2">
              Trending Search 2
            </li>
            <li className="border border-solid rounded-md p-2">Trending</li>
            <li className="border border-solid rounded-md p-2">Trending</li>
          </ul>
        </div>
      )}
      {searchValue != "" && (
        <div className="mt-4">
          <div
            className="flex h-16 border border-solid"
            onClick={() => router.push(`/music/1`)}
          >
            <img
              src="https://via.placeholder.com/600/51aa97"
              alt="searched"
              className="w-16 object-cover"
            />
            <div className="px-8 center flex flex-col align-middle">
              <div className="font-bold text-base truncate">
                The man of Sorrows
              </div>
              <div className="text-sm truncate">Bob M.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMusic;
