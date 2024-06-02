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

export const getSingleMusic = async (): Promise<Music | undefined> => {
  try {
    const response = await api_v1.get<{ music: Music }>(`/musics/single`);
    console.log("music data from geet all music ", response.data.music);
    return response.data.music;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return undefined;
  }
};

export const getMyMusic = async (): Promise<Music[] | undefined> => {
  try {
    const response = await api_v1.get<{ musics: Music[]; count: number }>(
      `/musics/my-music`
    );
    console.log("music data from geet all music ", response.data.musics);
    return response.data.musics;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return undefined;
  }
};

interface MusicUploadResponse {
  name: string;
  title: string;
  description: string;
  genre: string;
  data: File[];
  createdBy: `0x${string}`;
}

export const uploadMusic = async (
  formData: FormData
): Promise<MusicUploadResponse | undefined> => {
  try {
    const response = await api_v1.post<MusicUploadResponse>(
      "/musics/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Music uploaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading music:", error);
    return undefined;
  }
};
//// /single /my-music /upload
// /subscribe /add  /check

export interface Subscription {
  address: string;
  subscriptionEnd: string;
}

export const subscribeMusic = async (
  subscription: Subscription
): Promise<Subscription | undefined> => {
  try {
    const response = await api_v1.post<Subscription>(
      "/subscription/add",
      subscription
    );
    console.log("Subscription created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    return undefined;
  }
};

export const checkSubscription = async (
  address: string
): Promise<Subscription[] | undefined> => {
  try {
    const response = await api_v1.post<Subscription[]>("/subscription/check", {
      address,
    });
    console.log("Subscription status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return undefined;
  }
};
