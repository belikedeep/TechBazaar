// Auth-related type definitions

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: "customer" | "admin";
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}