'use client'

import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import Image from "next/image";

function ThumbnailGeneration({ videoId }: Readonly<{ videoId: string }>) {
    const { user } = useUser();

    const images = [{ 'id': 1, 'url': 'https://sl.bing.net/iq3tNiF4jka' }]; // Pull from convex DB

    // const images = [
    //     { id: 1, url: "https://sl.bing.net/iq3tNiF4jka" },
    //     { id: 2, url: "https://images.app.goo.gl/6X4n9UhvLRAZhWBp7" },
    // ];

    return (
        <div className="roudned-xl flex flex-col p-4 border">
            <Usage
                featureFlag={FeatureFlag.IMAGE_GENERATION}
                title={"Thumbnail Generation"} />

            {/*Simple horizontal scroll for images */}
            <div className={'flex overflow-x-auto gap-4 ${images?.length && "mt-4"}'}>
                {images.map(
                    (image) =>
                        image?.url && (
                            <><div
                                key={image.id}
                                className="flex-none w-[200px] h-[110px] rounded-lg overflow-x-auto" />
                                <Image
                                    src={image.url}
                                    width={200}
                                    height={200}
                                    alt="Generated Image"
                                    className="object-cover" /></>
                        ))}
            </div>

            {/* No images generated yet */}
            {!images?.length && (
                <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">
                        No thumbnails have been generated yet
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Generate thumbnails to see them appear here
                    </p>
                </div>
            )}

        </div >


    )
}

export default ThumbnailGeneration
