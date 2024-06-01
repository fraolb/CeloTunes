"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import CardSlider from "@/components/CardSlider";

import { useMusic } from "@/context/MusicContext";
import { Music } from "@/types/music";
import { getAllMusic } from "@/service/services";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  const { music, setMusic } = useMusic();

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.Browser = {
      T: () => {},
    };
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Fetch music data from an API or database
    console.log("The music data is ", music);
  }, [music]);

  if (!isMounted) {
    return null;
  }

  const musicData = [
    {
      id: 1,
      title: "Song Title 1",
      artist: "Artist Name 1",
      imageUrl: "https://via.placeholder.com/600/92c952",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Song Title 2",
      artist: "Artist Name 2",
      imageUrl: "https://via.placeholder.com/600/771796",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "Song Title 3",
      artist: "Artist Name 3",
      imageUrl: "https://via.placeholder.com/600/24f355",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "Song Title 4",
      artist: "Artist Name 4",
      imageUrl: "https://via.placeholder.com/600/f66b97",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    },
    // Add more music items as needed
  ];

  return (
    <div>
      {isConnected ? (
        <div className="container mx-auto p-4">
          <div>
            <div className="text-2xl font-bold p-2">Trending Now</div>
            <CardSlider musicData={musicData} />
          </div>
          <div>
            <div className="text-2xl font-bold p-2">Top Charts</div>
            <CardSlider musicData={musicData} />
            <CardSlider musicData={musicData} />
          </div>
          <div>
            <div className="text-2xl font-bold p-2">New Releases</div>
            <CardSlider musicData={musicData} />
            <CardSlider musicData={musicData} />
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
