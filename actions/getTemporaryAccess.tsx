'use server';

import { currentUser } from "@clerk/nextjs/server";
import {SchematicClient} from "@schematichq/schematic-typescript-node";

 // maske sure stays in the server

const apiKey = process.env.SCHEMATIC_API_KEY;

if(!apiKey) {
    throw new Error("SCHEMATIC_API_KEY is not set"); 
}

 const client = new SchematicClient({
    apiKey,
 });

 //sendind track events
//  client.track({
//     event: "some-action",
//     company: {
//         id: "your-company-id",
//     },
//     user: {
//         email: "wcoyote@acme.net",
//         userId: "your-user-id",
//     },
// });

export async function getTemporaryAccessToken() {

    const user = await currentUser(); // give me the user

    if (!user) {
        return null;
    }

    const response = await client.accesstokens.issueTemporaryAccessToken({
        resourceType: "company",
        lookup: {
            id: user.id
        }
    });

    return response.data.token;
} 