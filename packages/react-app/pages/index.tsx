import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import CardSlider from "@/components/CardSlider";

import { useMusic } from "@/context/MusicContext";
import { Music } from "@/types/music";
import { getAllMusic } from "@/service/services";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [shuffledMusic1, setShuffledMusic1] = useState<Music[]>([]);
  const [shuffledMusic2, setShuffledMusic2] = useState<Music[]>([]);
  const [shuffledMusic3, setShuffledMusic3] = useState<Music[]>([]);
  const [shuffledMusic4, setShuffledMusic4] = useState<Music[]>([]);
  const [shuffledMusic5, setShuffledMusic5] = useState<Music[]>([]);
  const [shuffledMusic6, setShuffledMusic6] = useState<Music[]>([]);

  const { music, setMusic } = useMusic();

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.Browser = {
      T: () => {},
    };
  }

  // Function to shuffle the music data array
  const shuffleArray = (array: Music[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchMusic = async () => {
      const musicData = await getAllMusic();
      if (musicData) {
        setMusic(musicData);
      }
    };

    fetchMusic();
  }, []);

  // useEffect(() => {
  //   if (music) {
  //     setShuffledMusic1(shuffleArray(music));
  //     setShuffledMusic2(shuffleArray(music));
  //     setShuffledMusic3(shuffleArray(music));
  //     setShuffledMusic4(shuffleArray(music));
  //     setShuffledMusic5(shuffleArray(music));
  //     setShuffledMusic6(shuffleArray(music));
  //   }
  // }, [music]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {isConnected && music ? (
        <div className="container mx-auto p-4">
          <div>
            <div className="text-2xl font-bold p-2">Trending Now</div>
            <CardSlider musicData={music.slice(0, 5)} />
          </div>
          <div>
            <div className="text-2xl font-bold p-2">Top Charts</div>
            <CardSlider musicData={music.slice(5, 10)} />
            <CardSlider musicData={music.slice(9)} />
          </div>
          <div>
            <div className="text-2xl font-bold p-2">New Releases</div>
            <CardSlider musicData={music.slice(-5).reverse()} />
            <CardSlider musicData={music.slice(-10, -5).reverse()} />
          </div>
        </div>
      ) : (
        //   </div>
        // </div>
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}
