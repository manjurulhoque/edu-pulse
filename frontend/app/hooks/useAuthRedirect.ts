import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;

        if (!session?.user) {
            router.push(`/login?next=${encodeURIComponent(pathname)}`);
        }
    }, [session, status, router, pathname]);

    return { session, status };
};
