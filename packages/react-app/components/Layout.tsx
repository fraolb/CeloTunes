import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import Navigation from "./Navigation";
import { useAudio } from "@/context/AudioContect";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { audioSrc, setAudioSrc } = useAudio();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const isDynamicPage = router.pathname.startsWith(`/music/[id]`);

  const closeMusic = () => {
    setAudioSrc(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">{children}</main>
      {audioSrc && !isDynamicPage && (
        <div
          className={`fixed bottom-14 h-12 w-full ${
            theme == "dark" ? "bg-gray-900" : "bg-white"
          }  flex justify-between px-2 border border-solid rounded shadow-md`}
          onClick={() => router.push(`/music/${audioSrc.id}`)}
        >
          <img
            src={audioSrc.imageUrl}
            alt="Playing music"
            className="w-16 h-12 object-cover rounded"
          />
          <div className="px-8">
            <div className="font-bold text-base truncate">{audioSrc.title}</div>
            <div className="text-sm truncate">{audioSrc.artist}</div>
          </div>

          <div className="flex p-0">
            <AudioPlayer
              src={audioSrc.audioUrl}
              style={{
                width: "80px",
                background: "none",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                border: "none",
                boxShadow: "none",
              }}
              volume={0.5}
              className="w-4 p-0 m-0"
              customAdditionalControls={[]}
              customVolumeControls={[]}
              customProgressBarSection={[]}
              layout="horizontal-reverse"
              showJumpControls={false}
            />
            <button onClick={closeMusic} className="p-2 " aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
