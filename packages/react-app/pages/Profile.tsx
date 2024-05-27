import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import MusicUploadForm from "@/components/MusicUploadForm";
import { X } from "lucide-react";

const Profile = () => {
  const [openForm, setOpenForm] = useState(false);
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
                <button onClick={() => setOpenForm(false)}>
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
      </div>
    </div>
  );
};

export default Profile;
