export interface Author {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  membershipId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipInfo {
  currentPlan: string;
  articlesRemaining: number | 'unlimited';
  videosRemaining?: number | 'unlimited';
}

export interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  membershipInfo?: MembershipInfo;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  membershipInfo?: MembershipInfo;
}
