import { Category } from "./category.interface";
import { Lesson } from "./lesson.interface";
import { User } from "./user.interface";

export interface Course {
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
    is_approved: boolean;
    is_featured: boolean;
    is_popular: boolean;
    status: "published" | "draft" | "archived" | "flagged";
    is_free: boolean;
    actual_price: number;
    discounted_price: number;
    created_at: Date;
    updated_at: Date;
    user: User;
    sections: Section[];
    lessons_count?: number;
}

export interface Section {
    id?: number | null | undefined;
    title: string;
    course_id?: number | null | undefined;
    lessons?: Lesson[];
}