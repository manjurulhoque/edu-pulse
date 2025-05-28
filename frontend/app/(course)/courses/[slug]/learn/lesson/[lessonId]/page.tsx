import { getCourseDetails } from "@/app/actions/getSingleCourse";
import { getCourseLessons, getLesson } from "@/app/actions/lessonInfo";
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
        return notFound();
    }
    const course = courseResult.value || null;
    const lessons = lessonsResult.value?.data || [];
    const lesson = lessonResult.value?.data || null;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <LessonSidebar course={course} lessons={lessons} currentLessonId={lesson.id} />
                </div>
                <div className="col-md-9">
                    <Link href={`/student/dashboard/my-courses`} className="button -md -yellow-1 text-dark-1 mb-3">
                        &larr; Back to Course
                    </Link>
                    <CourseLessonView lesson={lesson} />
                </div>
            </div>
        </div>
    );
};

export default LessonViewPage;
