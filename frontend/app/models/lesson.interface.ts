export interface Lesson {
    id?: number | null | undefined;
    title: string;
    url: string;
    content: string;
    is_free: boolean;
    is_published: boolean;
}