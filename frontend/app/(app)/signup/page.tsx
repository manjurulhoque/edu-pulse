import Signup from "@/app/components/auth/Signup";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { permanentRedirect } from "next/navigation";

const SignupPage = async () => {
    const data = await getServerSession(authOptions);
    if (data?.user) {
        permanentRedirect('/');
    }

    return <Signup/>;
};

export default SignupPage;