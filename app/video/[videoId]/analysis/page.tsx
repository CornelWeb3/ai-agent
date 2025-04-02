'use client';

import Usage from "@/components/Usage";
import YouTubeVideoDetails from "@/components/YouTubeVideoDetails";
import { FeatureFlag } from "@/features/flags";
import { useParams } from "next/navigation";

function AnalysisPage() {
    const params = useParams<{ videoId: string }>();
    const { videoId } = params;

    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Left side */}
                <div className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6">
                    {/* Analysis section */}
                    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
                        <Usage featureFlag={FeatureFlag.ANALYSE_VIDEO} title={"Analyse video"}
                        />
                    </div>


                    {/* Video transcription status */}
                    <YouTubeVideoDetails videoId={videoId} />

                    {/* You tube video details  */}
                    {/* Thumbnail generation */}
                    {/* Title generation */}
                    {/* Transcription */}
                </div>


                {/* Right side */}
                <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6em)]">
                    <p>Chat</p>
                </div>

            </div>

        </div>
    )
}

export default AnalysisPage;
