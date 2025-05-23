import Header from "@/app/components/layout/Header";
import PageLinks from "@/app/components/common/PageLinks";
import CourseDetails from "@/app/components/courses/CourseDetails";
import { getCourseDetails } from "@/app/actions/getSingleCourse";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    try {
        const course = await getCourseDetails(params.slug);
        return {
            title: `${course?.title} | EduPulse - Professional LMS Online Education Course`,
            description: course?.description,
        };
    } catch (error) {
        return {
            title: "Course not found",
            description: "Course not found",
        };
    }
};

const CourseDetailsPage = ({ params }: { params: { slug: string } }) => {

    return (
        <div className="main-content">
            <Header/>

            <div className="content-wrapper js-content-wrapper">
                <PageLinks dark={null}/>
                <CourseDetails/>
            </div>
        </div>
    )
}

export default CourseDetailsPage;