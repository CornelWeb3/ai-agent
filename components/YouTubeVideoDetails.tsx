'use client';

import { useEffect, useState } from "react";
import { VideoDetails } from "./types/types";
import { getVideoDetails } from "@/actions/getVideoDetails";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";

function YouTubeVideoDetails({ videoId }: Readonly<{ videoId: string }>) {

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

  // @container to parent so child elements can be responsive when add @md

  if (!video) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="border-4 animate-spin rounded-full h-8 w-8 border-t-blue-500 border-gray-300">
        </div>
      </div>
    );
  };

  return (
    <div className="@container bg-white rounded-xl">
      <div className="flex flex-col gap-8">

        {/* Video Thumbnail */}
        <div className="flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Video Details */}
        <div className="flex-grow space-y-4">
          <h1 className="text-2xl @lg:text-3xl font-bold text-gray-900 leading-tight line-clamp-2">
            {video.title}
          </h1>

          {/* Channel Info */}
          <div className="flex items-center gap-4">
            <img
              src={video.channel.thumbnail}
              alt={video.channel.title}
              width={48}
              height={48}
              className="w-10 h-10 @md:w-12 @md:h-12 rounded-full border-2 border-gray-100"
            />

            <div>
              <p className="text-base @md:text-lg font-semibold text-gray-900">
                {video.channel.title}
              </p>
              <p className="text-sm @md:text-base text-gray-600">
                {video.channel.subscribers} subscribers
              </p>
            </div>
          </div>

          {/* Video Stats */}
          <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4">
            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Published</p>
              </div>

              <p className="font-medium text-gray-900">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Views</p>
              </div>
              <p className="font-medium text-gray-900">{video.views}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <p className="font-medium text-gray-900">{video.likes}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">Comments</p>
              </div>
              <p className="font-medium text-gray-900">{video.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideoDetails
