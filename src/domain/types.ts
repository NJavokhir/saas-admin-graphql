export type ID = string;

export interface User {
    id: ID;
    name: string;
    username: string;
}

export interface Project {
    id: ID;
    title: string;
    body?: string;
    userId?: ID;
}

export interface PageMeta {
    totalCount: number;
}

export interface PagedUser {
    data: User[];
    meta: PageMeta;
}