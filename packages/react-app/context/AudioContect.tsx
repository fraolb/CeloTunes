import React, {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
} from "react";

interface MusicCardProps {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

interface AudioContextProps {
  audioSrc: MusicCardProps | null;
  setAudioSrc: (src: MusicCardProps | null) => void; // Allow null
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AudioProvider: FC<Props> = ({ children }) => {
  const [audioSrc, setAudioSrc] = useState<MusicCardProps | null>(null);

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
