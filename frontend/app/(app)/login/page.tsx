import Login from "@/app/components/auth/Login";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";
import {authOptions} from "@/app/utils/authOptions";

const LoginPage = async () => {
    // const router = useRouter();
    const data = await getServerSession(authOptions);
    if (data?.user) {
        permanentRedirect('/');
    }


    return <Login/>;
};

export default LoginPage;
