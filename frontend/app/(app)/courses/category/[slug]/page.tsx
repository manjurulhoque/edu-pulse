import PageLinks from "@/app/components/common/PageLinks";
import CategoryCourses from "@/app/components/courses/CategoryCourses";
import Header from "@/app/components/layout/Header";
import { CategoryApi } from "@/app/store/reducers/categories/api";
import { store } from "@/app/store";
import { redirect } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const { data } = await store.dispatch(CategoryApi.endpoints.categoryDetails.initiate({ slug }));
    let category = data?.data;
    return {
        title: `${category?.name} online courses`,
    };
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const { data } = await store.dispatch(CategoryApi.endpoints.categoryDetails.initiate({ slug }));
    let category = data?.data;
    if (!category) {
        redirect("/courses");
    }
    return (
        <div className="main-content">
            <Header />

            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <PageLinks dark={null} />
                <CategoryCourses category={category} />
            </div>
        </div>
    );
};

export default CategoryPage;
