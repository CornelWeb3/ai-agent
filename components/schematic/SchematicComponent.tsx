// run schematic embed
// because didn't use client, by default is using server component
'use client';

import { useEffect, useState } from "react";
import SchematicEmbed from "./SchematicEmbed";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccess";

export default function SchematicComponent({ componentId }: { componentId: string }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAccessToken() {
            try {
                const token = await getTemporaryAccessToken();
                if (!token) {
                    setError("Failed to get access token");
                    return;
                }
                setAccessToken(token);
            } catch (err) {
                console.error("Error fetching access token", err);
            }
        }

        fetchAccessToken();

    }, [componentId]);

    if (error) {
        return <p className="text-red-500">{error}</p>; // ✅ Renders a string, not an Error object
    }

    if (!componentId) {
        return null;
    }

    // Get access token
    // const accessToken = await getTemporaryAccessToken();

    if (!accessToken) {
        return <p>Loading component...</p>;
    }

    return <SchematicEmbed accessToken={accessToken} componentId={componentId}></SchematicEmbed>

}