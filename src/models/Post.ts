import { Author } from "./Author";
import { Comment } from "./Comment";

export type Post = {
  id: string;
  author: Author;
  content: Array<{ type: "paragraph" | "link"; content: string }>;
  publishedAt: Date;
  comments: Array<Comment>;
};
