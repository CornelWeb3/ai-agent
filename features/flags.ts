import { events } from "@schematichq/schematic-typescript-node/api";

export enum FeatureFlag{
    TRANSCRIPTION = "transcription", // avoid typos
    IMAGE_GENERATION = "image-generation",
    ANALYSE_VIDEO = "analyse-video",
    TITLE_GENERATION = "title-generations",
    SCRIPT_GENERATION = "script-generation",
}

export const featureFlagEvents: Record<FeatureFlag, { event: string }> = {
        [FeatureFlag.TRANSCRIPTION]: {
                event: "transcription",
        },
        [FeatureFlag.IMAGE_GENERATION]: {
                event: "image-generation",
        },
        [FeatureFlag.ANALYSE_VIDEO]: {
                event: "analyse-video",
        },
        [FeatureFlag.TITLE_GENERATION]: {
                event: "title-generations",
        },
        [FeatureFlag.SCRIPT_GENERATION]: {
                event: "script-generation",
        },
}