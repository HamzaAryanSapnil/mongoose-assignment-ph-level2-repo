import { Model, Types } from "mongoose";

export interface IBooks {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookStaticMethods extends Model<IBooks> {
  updateAvailability(bookId: Types.ObjectId | string): Promise<void>;
}

