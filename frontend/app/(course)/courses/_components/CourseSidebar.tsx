"use client";

import { Course } from "@/app/models/course.interface";
import { Lesson } from "@/app/models/lesson.interface";
import { Nav } from "react-bootstrap";

interface CourseSidebarProps {
    course: Course;
    lessons: Lesson[];
    currentLessonId: number;
}

export default function CourseSidebar({ course, lessons, currentLessonId }: CourseSidebarProps) {
    return (
        <Nav className="flex-column" variant="pills">
            {lessons.map((lesson) => (
                <Nav.Link
                    key={lesson.id}
                    active={lesson.id === currentLessonId}
                    href={`/courses/${course.slug}/learn/lesson/${lesson.id}`}
                >
                    {lesson.title}
                </Nav.Link>
            ))}
        </Nav>
    );
}
