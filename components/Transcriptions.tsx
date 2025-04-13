'use client'

import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";
import Usage from "./Usage";

function Transcriptions({ videoId }: Readonly<{ videoId: string }>) {

    interface TranscriptEntry {
        text: string;
        timestamp: string
    }

    const [transcript, setTranscript] = useState<{
        transcript: TranscriptEntry[];
        cache: string;
    } | null>(null);

    const { featureUsageExceed } = useSchematicEntitlement(
        FeatureFlag.TRANSCRIPTION
    );

    return (
        <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
            <Usage featureFlag={
                FeatureFlag.TRANSCRIPTION}
                title="Transcription"
            />
            {/* Transcription */}
            {!featureUsageExceed ? (
                <div className="flex flex-col gap-4max-h-[250px] overflow-y-auto roudned-md p-4">
                    {transcript ? (
                        transcript.transcript.map((entry, index) => (
                            <div
                                key={index}
                                className="flex gap-2"
                            >
                                <span className="text-sm text-gray-400 min-w-[50px]">
                                    {entry.timestamp}
                                </span>
                                <p className="text-sm text-gray-700">
                                    {entry.text}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">
                            No transcription available
                        </p>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default Transcriptions;
