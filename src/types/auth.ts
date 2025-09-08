export interface ActionState {
    error?: Error;
    success?: boolean;
    message?: string;
    values?: {
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        profile_image?: File | null;
    };
}

export interface Error {
    email?: string[];
    password?: string[];
    [key: string]: string[] | undefined;
}

export interface Meta {
  message: string
  code: number
}

export interface LoginData {
  access_token: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  membership: "A" | "B" | "C"
  articlesCount: number
  videosCount: number
}

export interface MembershipLimits {
  canAccessArticle: boolean
  canAccessVideo: boolean
  articlesRemaining: number | null
  videosRemaining: number | null
  currentPlan: string
}