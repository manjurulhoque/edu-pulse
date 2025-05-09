"use client";

import { useAdminGetCoursesQuery } from "@/app/store/reducers/admin/api";

const AdminAllCourses = () => {
    const { data: courses, isLoading: isCoursesLoading } = useAdminGetCoursesQuery({ page: 1, page_size: 10 });

    if (isCoursesLoading) {
        return <div>Loading...</div>;
    }

    if (courses) {
        console.log(courses);
    }

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">All Courses</h1>
                        <div className="mt-10">Track your admin activities and manage the platform</div>
                    </div>
                </div>

                <div className="row y-gap-30">
                    {courses?.results?.map((course) => (
                        <div key={course.id} className="col-12">
                            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                                <div className="p-20">
                                    <h3 className="text-18 lh-14 fw-700">{course.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAllCourses;
