export interface Lesson {
    id?: number | null | undefined;
    title: string;
    url: string;
    content: string;
    is_free: boolean;
    is_published: boolean;
    duration?: string; // Duration in format "HH:MM:SS"
    is_completed?: boolean;
    description?: string;
    resources?: string[];
}
