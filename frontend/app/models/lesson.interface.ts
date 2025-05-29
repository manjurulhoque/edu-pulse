export interface Lesson {
    id?: number | null | undefined;
    title: string;
    url: string;
    content: string;
    is_free: boolean;
    is_published: boolean;
    lesson_completion?: LessonCompletion | null;
}

export interface LessonCompletion {
    id?: number | null | undefined;
    lesson_id: number;
    user_id: number;
    enrollment_id: number;
    completed_at: string;
    time_spent: number;
}
