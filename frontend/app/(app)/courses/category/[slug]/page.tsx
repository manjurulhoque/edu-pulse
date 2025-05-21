import PageLinks from "@/app/components/common/PageLinks";
import CategoryCourses from "@/app/components/courses/CategoryCourses";
import Header from "@/app/components/layout/Header";
import { CategoryApi } from "@/app/store/reducers/categories/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Category Page",
    description: "Category Page",
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const data = await CategoryApi.endpoints.categoryDetails.initiate({ slug });
    return (
        <div className="main-content">
            <Header />

            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <PageLinks dark={null}/>
                <CategoryCourses />
            </div>
        </div>
    );
};

export default CategoryPage;
