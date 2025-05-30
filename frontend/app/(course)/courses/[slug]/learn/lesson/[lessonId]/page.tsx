import { getCourseDetails } from "@/app/actions/courseInfo";
import { getCourseLessons, getLesson, markLessonAsStarted } from "@/app/actions/lessonInfo";
import LessonSidebar from "@/app/(course)/courses/_components/LessonSidebar";
import { notFound } from "next/navigation";
import CourseLessonView from "@/app/(course)/courses/_components/CourseLessonView";
import Link from "next/link";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const course = await getCourseDetails(params.slug);
    return {
        title: `${course?.title} | EduPulse - Professional LMS Online Education Course`,
        description: course?.description,
    };
};

const LessonViewPage = async ({ params }: { params: { slug: string; lessonId: number } }) => {
    // await for both promises to resolve
    const promises = Promise.allSettled([
        getCourseDetails(params.slug),
        getCourseLessons(params.slug),
        getLesson(params.lessonId),
    ]);
    const [courseResult, lessonsResult, lessonResult] = await promises;
    if (
        courseResult.status === "rejected" ||
        lessonsResult.status === "rejected" ||
        lessonResult.status === "rejected"
    ) {
        notFound();
    }
    const course = courseResult.value || null;
    const lessons = lessonsResult.value?.data || [];
    let lesson = lessonResult.value?.data || null;
    if (!lesson?.lesson_completion) {
        const result = await markLessonAsStarted(params.lessonId);
        if (result) {
            lesson = { ...lesson, lesson_completion: result?.data };
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <LessonSidebar course={course} lessons={lessons} currentLessonId={lesson.id} />
                </div>
                <div className="col-md-9">
                    <CourseLessonView lesson={lesson} />
                </div>
            </div>
        </div>
    );
};

export default LessonViewPage;
