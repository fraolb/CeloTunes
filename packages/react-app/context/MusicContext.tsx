// MusicContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Music } from "@/types/music";
import { getAllMusic } from "@/service/services";

interface MusicContextType {
  music: Music[];
  setMusic: React.Dispatch<React.SetStateAction<Music[]>>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [music, setMusic] = useState<Music[]>([]);

  React.useEffect(() => {
    const fetchMusic = async () => {
      const musicData = await getAllMusic();
      if (musicData) {
        setMusic(musicData);
      }
    };

    fetchMusic();
  }, [music]);

  return (
    <MusicContext.Provider value={{ music, setMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
