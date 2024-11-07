export interface Post {
  id: string;
  data: {
    created_at: number;
    userId: string;
    news: string;
  };
}
