import { Metadata } from "next";
import UserProfileEdit from "@/app/components/user/UserProfileEdit";

export const metadata: Metadata = {
    title: "Profile | EduPulse - Professional LMS Online Education Course",
};

const ProfilePage = () => {
    return <UserProfileEdit />;
};

export default ProfilePage;
