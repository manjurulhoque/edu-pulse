import { getUserInfo } from "@/app/actions/getUserInfo";
import InstructorProfile from "@/app/components/user/InstructorProfile";
import StudentProfile from "@/app/components/user/StudentProfile";
import { redirect } from "next/navigation";

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
    const result = await getUserInfo(params.username);
    const user = result?.data;
    return {
        title: user?.name || "User",
    };
};

const UserPage = async ({ params }: { params: { username: string } }) => {
    const result = await getUserInfo(params.username);
    const user = result?.data;
    if (!user) {
        redirect("/");
    }
    if (user.is_instructor) {
        return <InstructorProfile user={user} />;
    }
    return <StudentProfile user={user} />;
};

export default UserPage;
