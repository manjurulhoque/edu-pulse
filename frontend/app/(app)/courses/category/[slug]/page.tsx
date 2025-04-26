import CategoryCourses from "@/app/components/courses/CategoryCourses";
import Header from "@/app/components/layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Category Page",
    description: "Category Page",
};

const CategoryPage = () => {
    return (
        <div className="main-content">
            <Header />
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <CategoryCourses />
            </div>
        </div>
    );
};

export default CategoryPage;
