import { Metadata } from "next";
import UserProfile from "@/app/components/user/UserProfile";

export const metadata: Metadata = {
    title: "Profile | EduPulse - Professional LMS Online Education Course",
};

const ProfilePage = () => {
    return <UserProfile />;
};

export default ProfilePage;
