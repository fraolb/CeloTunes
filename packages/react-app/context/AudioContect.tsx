import React, {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
} from "react";
import { Music } from "@/types/music";

interface AudioContextProps {
  audioSrc: Music | null;
  setAudioSrc: (src: Music | null) => void; // Allow null
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AudioProvider: FC<Props> = ({ children }) => {
  const [audioSrc, setAudioSrc] = useState<Music | null>(null);

  return (
    <AudioContext.Provider value={{ audioSrc, setAudioSrc }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
