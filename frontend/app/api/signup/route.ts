import httpStatus from "@/app/utils/http-status";
import { NextResponse } from "next/server";

type ResponseData = {
    message: string
}

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    const {name, email, password}: RequestBody = await req.json();
    console.log(process.env);

    const response = await fetch(`${process.env.BACKEND_DOCKER_BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    });

    if (response.ok) {
        return NextResponse.json({message: "User created successfully"}, {status: httpStatus.CREATED});
    }

    // Handle errors
    const errorData: ResponseData = await response.json();
    const errorMessage = errorData.message || "Something went wrong";
    return NextResponse.json({message: errorMessage}, {status: response.status});
}