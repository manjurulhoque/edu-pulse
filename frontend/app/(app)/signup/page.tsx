import Signup from "@/app/components/auth/Signup";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import {authOptions} from "@/app/utils/authOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup | EduPulse - Professional LMS Online Education Course",
    description: "Signup page",
};

const SignupPage = async () => {
    const data = await getServerSession(authOptions);
    if (data?.user) {
        permanentRedirect('/');
    }

    return <Signup/>;
};

export default SignupPage;