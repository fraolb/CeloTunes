// types.ts
export interface Image {
  public_id: string;
  url: string;
  _id?: string; // _id is optional for Image
}

export interface Music {
  _id?: string; // _id is optional for Music
  name: string;
  title: string;
  description?: string;
  genre:
    | "Pop"
    | "Classical"
    | "Jazz"
    | "Hiphop"
    | "EDM"
    | "Electronic"
    | "Other";
  price: number;
  image: Image[];
  music: Image[];
  createdBy: string;
  premium?: boolean;
  createdAt?: string; // createdAt is optional
  updatedAt?: string; // updatedAt is optional
  __v?: number; // __v is optional
}
