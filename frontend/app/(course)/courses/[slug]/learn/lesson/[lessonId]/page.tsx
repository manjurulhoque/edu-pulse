import { getCourseDetails } from "@/app/actions/getSingleCourse";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const course = await getCourseDetails(params.slug);
    return {
        title: `${course?.title} | EduPulse - Professional LMS Online Education Course`,
        description: course?.description,
    };
};

const LessonViewPage = () => {
    return <div>Lesson Page</div>;
};

export default LessonViewPage;
