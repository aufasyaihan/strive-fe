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

export interface loginResponse {
  meta: Meta
  data: Data
}

export interface Meta {
  message: string
  code: number
}

export interface Data {
  access_token: string
}