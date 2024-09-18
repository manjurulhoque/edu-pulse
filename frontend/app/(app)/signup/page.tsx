import Signup from "@/app/components/auth/Signup";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import {authOptions} from "@/app/utils/authOptions";

const SignupPage = async () => {
    const data = await getServerSession(authOptions);
    if (data?.user) {
        permanentRedirect('/');
    }

    return <Signup/>;
};

export default SignupPage;