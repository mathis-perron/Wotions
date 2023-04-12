import type { Timestamp } from 'firebase/firestore';

export type IUser = {
  email: string;
  emailVerified: boolean;
  image: string;
  name: string;
  username: string;
  bio: string;
  twitter: string;
  facebook: string;
  website: string;
};

// ARTICLE
export type IArticle = {
  id?: string;
  content: string;
  cover: string;
  timestamp: Timestamp;
  title: string;
  user: any;
};

export type IArticleUser = {
  id: string;
  username: string;
};
