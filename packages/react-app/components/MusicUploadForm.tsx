import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { uploadMusic } from "@/service/services";
import "tailwindcss/tailwind.css"; // make sure tailwind is properly configured

const MusicUploadForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [genre, setGenre] = useState<string>("Pop");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [music, setMusic] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { address, isConnected } = useAccount();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMusic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !genre || !address || !image || !music) {
      return alert("Please fill all the fields");
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("data", image);
    formData.append("data", music);
    formData.append("createdBy", address);

    const response = await uploadMusic(formData);
    setIsLoading(false);
    if (response) {
      setNotification({ message: "Upload successful!", type: "success" });
      // Clear the form data
      setName("");
      setTitle("");
      setDescription("");
      setGenre("Pop");
      setImage(null);
      setMusic(null);
    } else {
      setNotification({
        message: "Upload failed. Please try again.",
        type: "error",
      });
    }

    // Hide the notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  return (
    <div className="max-w-md mx-auto p-4">
      {notification && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label
            htmlFor="name"
            className="block text-sm font-medium w-1/3 text-left"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="title"
            className="block text-sm font-medium w-1/3 text-left"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="description"
            className="block text-sm font-medium w-1/3 text-left"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="genre"
            className="block text-sm font-medium w-1/3 text-left"
          >
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Pop">Pop</option>
            <option value="Classical">Classical</option>
            <option value="Jazz">Jazz</option>
            <option value="Hiphop">Hiphop</option>
            <option value="EDM">EDM</option>
            <option value="Electronic">Electronic</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="image"
            className="block text-sm font-medium w-1/3 text-left"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="music"
            className="block text-sm font-medium w-1/3 text-left"
          >
            Music
          </label>
          <input
            type="file"
            id="music"
            accept="audio/*"
            onChange={handleMusicChange}
            className="mt-1 block w-full text-sm"
            required
          />
        </div>
        <div className="flex justify-center gap-2">
          <input type="checkbox" required />
          <div>I agree with the terms.</div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MusicUploadForm;
