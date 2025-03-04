import { Author } from "./Author";

export type Comment = {
  id: string;
  author: Omit<Author, "role">;
  publishedAt: Date;
  content: string;
  likes: number;
};
