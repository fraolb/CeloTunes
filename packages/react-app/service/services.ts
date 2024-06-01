// services.ts
import axios from "axios";
import { Music } from "@/types/music";

const BASE_URL = "http://localhost:5000/api/v1";

const api_v1 = axios.create({
  baseURL: BASE_URL,
});

// Musics
export const getAllMusic = async (): Promise<Music[] | undefined> => {
  try {
    const response = await api_v1.get<{ musics: Music[]; count: number }>(
      `/musics`
    );
    console.log("music data from geet all music ", response.data.musics);
    return response.data.musics;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return undefined;
  }
};
