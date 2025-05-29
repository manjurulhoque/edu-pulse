"use client";

import { Course } from "@/app/models/course.interface";
import { Lesson } from "@/app/models/lesson.interface";
import { CheckCircle2, Circle } from "lucide-react";
import styles from "./LessonSidebar.module.css";
import Link from "next/link";

interface LessonSidebarProps {
    course: Course;
    lessons: Lesson[];
    currentLessonId: number;
}

export default function LessonSidebar({ course, lessons, currentLessonId }: LessonSidebarProps) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h5 className={styles.title}>{course.title}</h5>
            </div>
            <div className={styles.lessonsList}>
                {lessons.map((lesson) => (
                    <Link
                        key={lesson.id}
                        href={`/courses/${course.slug}/learn/lesson/${lesson.id}`}
                        className={`${styles.lessonItem} ${lesson.id === currentLessonId ? styles.active : ""}`}
                    >
                        <div className={styles.lessonContent}>
                            {lesson.is_completed ? (
                                <CheckCircle2 className="text-success" size={18} />
                            ) : (
                                <Circle className="text-muted" size={18} />
                            )}
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                        </div>
                        {lesson.duration && <span className={styles.duration}>{lesson.duration}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
}
