export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  replies?: Comment[];
  replyingTo?: string;
  score: number;
  user: User;
};
