import { useParams } from "next/navigation";
import { getCourseDetails } from "@/app/actions/getSingleCourse";


export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const course = await getCourseDetails(params.slug);
    return {
        title: `${course?.title} | EduPulse - Professional LMS Online Education Course`,
        description: course?.description,
    };
};

const LessonDetailsPage = () => {
    const { slug, lessonId } = useParams();
    return <div>LessonPage {slug} {lessonId}</div>;
};

export default LessonDetailsPage;
