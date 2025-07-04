export interface Lesson {
    id: number;
    title: string;
    url: string;
    content: string;
    is_free: boolean;
    is_published: boolean;
    lesson_completion?: LessonCompletion | null;
}

export interface LessonCompletion {
    id: number;
    lesson_id: number;
    user_id: number;
    enrollment_id: number;
    is_completed: boolean;
    completed_at: string;
    time_spent: number;
}
