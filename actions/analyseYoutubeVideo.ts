"use server";

import { getVideoFromURL } from "@/lib/getVideoFromURL";
import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
    const url = formData.get("url")?.toString();
    if (!url) return;

    const videoId = getVideoFromURL(url);

    console.log("Video id is: ", videoId);

    if (!videoId) return;

    // Redirect to the new post
    redirect(`/video/${videoId}/analysis`);
}