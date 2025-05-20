import { getUserInfo } from "@/app/actions/getUserInfo";

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
    const user = await getUserInfo(params.username);
    return {
        title: user?.name || "User",
    };
};

const UserPage = async ({ params }: { params: { username: string } }) => {
    const user = await getUserInfo(params.username);
    return <div>{user?.name}</div>;
};

export default UserPage;
