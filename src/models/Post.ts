export type Post = {
  id: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  content: Array<{ type: "paragraph" | "link"; content: string }>;
  publishedAt: Date;
};
