import { User } from "./User";

export type Comment = {
  id: number;
  author: Omit<User, "role" | "coverUrl">;
  publishedAt: Date;
  content: string;
  likes: number;
};
