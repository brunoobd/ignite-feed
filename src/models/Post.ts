import { Comment } from "./Comment";
import { User } from "./User";

export type Post = {
  id: number;
  author: User;
  content: Array<{ type: "paragraph" | "link"; content: string }>;
  publishedAt: Date;
  comments: Array<Comment>;
};
