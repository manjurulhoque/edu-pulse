interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    short_description: string;
    student_will_learn: string;
    requirements: string;
    preview_image: string;
    level: string;
    category: Category | null;
    category_id: number;
    is_published: boolean;
    is_free: boolean;
    actual_price: number;
    discounted_price: number;
    created_at: Date;
    updated_at: Date;
    user: User;
}

interface Section {
    id?: number | null | undefined;
    title: string;
    course_id?: number | null | undefined;
    lessons?: Lesson[]
}