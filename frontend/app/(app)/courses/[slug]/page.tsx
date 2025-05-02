import Header from "@/app/components/layout/Header";
import { Metadata } from "next";
import PageLinks from "@/app/components/common/PageLinks";
import CourseDetails from "@/app/components/courses/CourseDetails";

export const metadata: Metadata = {
    title: "Course page",
    description: "Course list page",
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