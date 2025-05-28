"use client";

import { Course } from "@/app/models/course.interface";
import { Lesson } from "@/app/models/lesson.interface";

interface LessonSidebarProps {
    course: Course;
    lessons: Lesson[];
    currentLessonId: number;
}

export default function LessonSidebar({ course, lessons, currentLessonId }: LessonSidebarProps) {
    return (
        <div className="bg-white border-end vh-100 p-3 sticky-top" style={{ minWidth: 250 }}>
            <h5 className="mb-4">{course.title}</h5>
            <ul className="list-group list-group-flush">
                {lessons.map((lesson) => (
                    <a
                        key={lesson.id}
                        href={`/courses/${course.slug}/learn/lesson/${lesson.id}`}
                        className={`list-group-item list-group-item-action${
                            lesson.id === currentLessonId ? " active" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                    >
                        {lesson.title}
                    </a>
                ))}
            </ul>
        </div>
    );
}
