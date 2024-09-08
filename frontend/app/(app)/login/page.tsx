import Login from "@/app/components/auth/Login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

const LoginPage = async () => {
    // const router = useRouter();
    const data = await getServerSession(authOptions);
    if (data?.user) {
        permanentRedirect('/');
    }


    return <Login/>;
};

export default LoginPage;
