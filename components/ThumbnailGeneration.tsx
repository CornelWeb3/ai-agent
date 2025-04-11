'use client'

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";

function ThumbnailGeneration({ videoId }: Readonly<{ videoId: string }>) {
    const { user } = useUser();

    const images = []; // Pull from convex DB

    return (
        <div className="roudned-xl flex flex-col p-4 border">
            <Usage
                featureFlag={FeatureFlag.IMAGE_GENERATION}
                title={"Thumbnail Generation"} />
        </div>
    )
}

export default ThumbnailGeneration
