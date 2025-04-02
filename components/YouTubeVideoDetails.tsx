'use client';

import { useEffect, useState } from "react";
import { VideoDetails } from "./types/types";
import { getVideoDetails } from "@/actions/getVideoDetails";

function YouTubeVideoDetails({ videoId }: { videoId: string }) {

  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const video = await getVideoDetails(videoId);
        setVideo(video);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]); // Ensure it runs only when videoId changes or component mounts on the screen

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }


  // @container to parent so child elements can be responsive when add @md
  return (
    <div className="@container bg-white rounded:xl">
      <div className="flex flex-col @md:flex-row gap-8">
        <div className="flex-shrink-0 @md:w-[280px]">
          <img
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />

          <h2>{video.title}</h2>
          <p>Views: {video.views}</p>
          <p>Likes: {video.likes}</p>
          <p>Comments: {video.comments}</p>
          <p>Channel: {video.channel.title}</p>
          <p>Published At: {video.publishedAt}</p>

        </div>
      </div>
    </div>
  )
}

export default YouTubeVideoDetails
