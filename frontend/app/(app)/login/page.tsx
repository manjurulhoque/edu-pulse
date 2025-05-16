import Login from "@/app/components/auth/Login";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import { authOptions } from "@/app/utils/authOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | EduPulse - Professional LMS Online Education Course",
    description: "Login page",
};

const LoginPage = async () => {
    // const router = useRouter();
    const data = await getServerSession(authOptions);
    if (data?.user) {
        permanentRedirect("/");
    }

    return <Login />;
};

export default LoginPage;
