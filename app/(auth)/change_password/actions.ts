"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function changePasswordAction(formData: FormData) {
    // extract data form FORM by name
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    // server safety , validation for inputs
    if (!oldPassword || !newPassword) {
        throw new Error("Please fill in all fields");
    }

    try {
        // read token from cookies 
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;
        if (!token) {
            throw new Error("You are not authenticated!");
        }
        // send api request
        await axios.post(`https://upskilling-egypt.com:3005/api/auth/change-password`, {
            password: oldPassword,
            password_new: newPassword
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMsg = error.response?.data?.message || "Something went wrong!";
            throw new Error(errorMsg);
        }

        throw new Error("An unexpected error occurred");
    }
    redirect("/");
}