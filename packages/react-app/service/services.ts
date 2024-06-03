// services.ts
import axios from "axios";
import { Music } from "@/types/music";

const BASE_URL = "https://celotunes-production.up.railway.app/api/v1";

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

export const getMyMusic = async (
  address: string
): Promise<Music[] | undefined> => {
  try {
    const response = await api_v1.get<{ myMusic: Music[]; count: number }>(
      `/musics/my-music`,
      {
        params: {
          address: address,
        },
      }
    );
    console.log("music data from geet all music ", response.data);
    return response.data.myMusic;
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
  _id: string;
  address: string;
  subscriptionEnd: string;
  subscriptionStart: string;
  __v: number;
}

interface subscriptionInput {
  address: `0x${string}` | undefined;
  subscriptionEnd: string;
}

export const subscribeMusic = async (
  subscription: subscriptionInput
): Promise<Subscription | undefined> => {
  try {
    const address = subscription.address;
    const subscriptionEnd = subscription.subscriptionEnd;

    const response = await api_v1.post<Subscription>("subscribe/add", {
      address,
      subscriptionEnd,
    });
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
    const response = await api_v1.get<Subscription[]>("subscribe/check", {
      params: {
        address: address,
      },
    });
    console.log("Subscription status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return undefined;
  }
};

///user

interface userInput {
  address: string | undefined;
  name: string;
}
interface userData {
  address: string | undefined;
  name: string;
  music: [];
}

export const createUser = async (
  userData: userInput
): Promise<userData[] | undefined> => {
  try {
    const address = userData.address;
    const name = userData.name;

    const response = await api_v1.post<userData[]>("user/create", {
      address,
      name,
    });
    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return undefined;
  }
};

export const checkUser = async (
  address: string
): Promise<userData[] | undefined> => {
  try {
    const response = await api_v1.get<userData[]>("user/get", {
      params: {
        address: address,
      },
    });
    console.log("User status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking user:", error);
    return undefined;
  }
};

//add to playlist
interface PlaylistData {
  address: `0x${string}`;
  musicIds: string;
}
export const addToPlaylist = async (
  playlistData: PlaylistData
): Promise<userData[] | undefined> => {
  try {
    const { address, musicIds } = playlistData;

    const response = await api_v1.post<userData[]>("/musics/add", {
      address,
      musicIds,
    });
    console.log("Playlist added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding to playlist:", error);
    return undefined;
  }
};
