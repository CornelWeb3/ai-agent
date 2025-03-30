// run schematic embed
// because didn't use client, by default is using server component

import SchematicEmbed from "./SchematicEmbed";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccess";

async function SchematicComponent({ componentId, }:
    {
        componentId: string;
    }) {

    if (!componentId) {
        return null;
    }

    // Get access token
    const accessToken = await getTemporaryAccessToken();

    if (!accessToken) {
        return new Error("Failed to get access token");
    } 

    return <SchematicEmbed accessToken={accessToken} componentId={componentId}></SchematicEmbed>

}

export default SchematicComponent
