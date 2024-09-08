import Header from "@/app/components/layout/Header";
import { Metadata } from "next";
import PageLinks from "@/app/components/common/PageLinks";
import SingleCourse from "@/app/components/courses/SingleCourse";

export const metadata: Metadata = {
    title: "Course page",
    description: "Course list page",
};

const SingleCoursePage = ({ params }: { params: { slug: string } }) => {

    return (
        <div className="main-content">
            <Header/>

            <div className="content-wrapper js-content-wrapper">
                <PageLinks dark={null}/>
                <SingleCourse/>
            </div>
        </div>
    )
}

export default SingleCoursePage;