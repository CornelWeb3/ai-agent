'use client';

import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

/**
 * A sticky header that appears at the top of every page.
 *
 * Consists of a container with a blue AgentTube logo on the left and
 * an empty right side for future development.
 *
 * @returns {JSX.Element} A sticky header element.
 */

function Header() {
    return (
        <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80  border-b border-gray-200 z-50">
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-16">
                    {/* Left */}
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-4">
                            <AgentPulse size="small" color="blue" />
                            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                AgentTube
                            </h1>
                        </Link>
                    </div>

                    {/* Right ->  Only render when SignedIn */}
                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <Link href="/manage-plan">
                                <Button>
                                    Manage Plan
                                </Button>
                            </Link>

                            <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
                                <UserButton />
                            </div>
                        </SignedIn>

                        <SignedOut>
                            <SignInButton mode = "modal">
                                <Button
                                    variant="ghost"
                                    className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header
