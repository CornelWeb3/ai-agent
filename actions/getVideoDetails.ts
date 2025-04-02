'use server'

import { google } from 'googleapis';
import { VideoDetails } from '../components/types/types';

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,  // without NEXT_PUBLIC is available only on server not client. Keep things secure
});

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
    console.log("Video id is: ", videoId);

    try {
        const videoResponse = await youtube.videos.list({
            part: ["statistics", "snippet"],
            id: [videoId],
        });

        const videoDetails = videoResponse.data.items?.[0];

        if (!videoDetails) {
            throw new Error("Video not found");
        }

        const channelResponse = await youtube.channels.list({
            part: ["statistics", "snippet"],
            id: [videoDetails.snippet?.channelId || ""],
            key: process.env.YOUTUBE_API_KEY,
        });

        const channelDetails = channelResponse.data.items?.[0];

        if (!channelDetails) {
            throw new Error("Channel not found");
        }

        const video: VideoDetails = {
            //Video info
            title: videoDetails.snippet?.title || "Unknown title",
            thumbnail:
                videoDetails.snippet?.thumbnails?.maxres?.url ||
                videoDetails.snippet?.thumbnails?.high?.url ||
                videoDetails.snippet?.thumbnails?.default?.url ||
                "",
            publishedAt: videoDetails.snippet?.publishedAt || new Date().toDateString(),

            // Video stats
            views: videoDetails.statistics?.viewCount || "0",
            likes: videoDetails.statistics?.likeCount || "Not available",
            comments: videoDetails.statistics?.commentCount || "Not available",

            // Channel info
            channel: {
                title: videoDetails.snippet?.channelTitle || "Unknown channel",
                thumbnail: channelDetails.snippet?.thumbnails?.default?.url || "",
                subscribers: channelDetails.statistics?.subscriberCount || "0",
            },
        };
        return video;

    } catch (error) {
        console.error("Error fetching video details:", error);
        return null;
    }

}