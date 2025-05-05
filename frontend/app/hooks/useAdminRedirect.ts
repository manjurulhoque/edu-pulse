import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// Redirect to home page if not admin
export const useAdminRedirect = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;

        if (!session?.user) {
            router.push(`/login?next=${encodeURIComponent(pathname)}`);
        }
        if (session?.user && !session.user.is_admin) {
            router.push("/");
        }
    }, [session, status, router, pathname]);

    return { session, status };
};
