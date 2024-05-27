import React, { useState } from "react";

const MusicUploadForm: React.FC = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("Pop");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [music, setMusic] = useState<File | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label
            htmlFor="name"
            className="block text-sm font-medium  w-1/3 text-left"
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
            className="block text-sm font-medium  w-1/3 text-left"
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
            className="block text-sm font-medium  w-1/3 text-left"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="genre"
            className="block text-sm font-medium  w-1/3 text-left"
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
            {/* Add more genres as needed */}
          </select>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="price"
            className="block text-sm font-medium  w-1/3 text-left"
          >
            Price
          </label>
          <div className="relative w-full">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md pr-8"
              required
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 ">
              $
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="image"
            className="block text-sm font-medium  w-1/3 text-left"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm "
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="music"
            className="block text-sm font-medium  w-1/3 text-left"
          >
            Music
          </label>
          <input
            type="file"
            id="music"
            accept="audio/*"
            onChange={handleMusicChange}
            className="mt-1 block w-full text-sm "
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default MusicUploadForm;
