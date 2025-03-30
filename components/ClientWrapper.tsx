"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";
// import SchematicWrapped from "./SchematicWrapped";
// import { ConvexClientProvider } from "./ConvexClientProvider";


export default function ClientWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const schematicPubKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;

    if (!schematicPubKey) {
        throw new Error(
            "No Schematic Publishable Key found. Please add it to your .env.local file."
        );
    }

    return (
        <ClerkProvider
            appearance={{
                baseTheme: [dark],
                // variables: { colorPrimary: 'blue' },
                signIn: {
                    //    baseTheme: [shadesOfPurple],
                    //   variables: { colorPrimary: 'blue' },
                },
            }}
        >
            <SchematicProvider publishableKey={schematicPubKey}>
                <SchematicWrapped> {children}</SchematicWrapped>
            </SchematicProvider>
        </ClerkProvider>
    );
}