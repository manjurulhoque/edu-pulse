"use client";

import { Lesson } from "@/app/models/lesson.interface";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

interface CourseLessonViewProps {
    lesson: Lesson;
}

const CourseLessonView = ({ lesson }: CourseLessonViewProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <div className="container-fluid py-4">
            <div className="card mb-4 shadow-sm border-0 bg-dark">
                <div className="ratio ratio-16x9">
                    <ReactPlayer
                        controls={true}
                        url={lesson.content}
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                    />
                </div>
            </div>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="card-title mb-3">{lesson.title}</h4>
                    <p className="card-text text-secondary">{lesson.content}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseLessonView;
