import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { courseIds, ...checkoutData } = body;

        // Call your backend API to process the checkout
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.access}`,
                },
                body: JSON.stringify({
                    course_ids: courseIds,
                    checkout_data: checkoutData,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Checkout failed");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to process checkout" },
            { status: 500 }
        );
    }
}
