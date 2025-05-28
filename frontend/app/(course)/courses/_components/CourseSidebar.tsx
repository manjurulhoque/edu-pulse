"use client";

import { Course } from "@/app/models/course.interface";
import { Lesson } from "@/app/models/lesson.interface";
import { Nav, Card } from "react-bootstrap";
import styles from "./CourseSidebar.module.css";

interface CourseSidebarProps {
    course: Course;
    lessons: Lesson[];
    currentLessonId: number;
}

export default function CourseSidebar({ course, lessons, currentLessonId }: CourseSidebarProps) {
    return (
        <Card className={styles.sidebar}>
            <Card.Header className={styles.header}>
                <h5 className="mb-0">{course.title}</h5>
            </Card.Header>
            <Card.Body className="p-0">
                <Nav className={`flex-column ${styles.nav}`} variant="pills">
                    {lessons.map((lesson) => (
                        <Nav.Link
                            key={lesson.id}
                            active={lesson.id === currentLessonId}
                            href={`/courses/${course.slug}/learn/lesson/${lesson.id}`}
                            className={styles.navLink}
                        >
                            {lesson.title}
                        </Nav.Link>
                    ))}
                </Nav>
            </Card.Body>
        </Card>
    );
}
