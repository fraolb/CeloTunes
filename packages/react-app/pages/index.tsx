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

  return (
    <div>
      {isConnected && music ? (
        <div className="container mx-auto p-4">
          <div>
            <div className="text-2xl font-bold p-2">Trending Now</div>
            <CardSlider musicData={music} />
          </div>
          <div>
            <div className="text-2xl font-bold p-2">Top Charts</div>
            <CardSlider musicData={music} />
            <CardSlider musicData={music} />
          </div>
          <div>
            <div className="text-2xl font-bold p-2">New Releases</div>
            <CardSlider musicData={music} />
            <CardSlider musicData={music} />
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
