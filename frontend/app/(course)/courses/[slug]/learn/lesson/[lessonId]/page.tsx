import { getCourseDetails } from "@/app/actions/getSingleCourse";
import { getCourseLessons, getLesson } from "@/app/actions/lessonInfo";
import CourseSidebar from "@/app/(course)/courses/_components/CourseSidebar";
import { notFound } from "next/navigation";
import CourseLessonView from "@/app/(course)/courses/_components/CourseLessonView";

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
    console.log(courseResult, lessonsResult, lessonResult);
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
                    <CourseSidebar course={course} lessons={lessons} currentLessonId={lesson.id} />
                </div>
                <div className="col-md-9">
                    <CourseLessonView lesson={lesson} />
                </div>
            </div>
        </div>
    );
};

export default LessonViewPage;
