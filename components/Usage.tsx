'use client';

import { FeatureFlag } from "../features/flags";
import { Progress } from "@radix-ui/react-progress";
import { useSchematicIsPending, useSchematicEntitlement } from "@schematichq/schematic-react";
import { JSX } from "react";

function Usage({
    featureFlag,
    title
}: Readonly<{
    featureFlag: FeatureFlag,
    title: string;
}>) {

    const isPending = useSchematicIsPending();
    let usageMessage: JSX.Element | null = null;
    // loading state
    // if (isPending) {
    //     //     return <Loader />;
    //    return "Loader";
    // }

    const {
        featureAllocation,  // 5 transcription / month
        featureUsage,      // how much used
        value: isFeatureEnabled,
    } = useSchematicEntitlement(featureFlag);  // feature flag si transcription
    // /        featureUsageExceeded, parameter can be added

    //console.log(featureAllocation, featureUsage);

    if (isPending) {
        return <div className="text-gray-500 text-center py-4">Loading...</div>;
    }

    const hasUsedAllToken = featureUsage && featureAllocation && featureUsage >= featureAllocation;

    if (hasUsedAllToken) {
        return (
            <div>
                <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    </div>

                    <div className="px-4 py-2 bg-red-50 rounded-lg">
                        <span className="font-medium text-red-700">{featureUsage}</span>
                        <span className="text-red-400 mx-2">/</span>
                        <span className="font-medium text-red-700"> {featureAllocation}</span>
                    </div>

                </div>

                <div className="relative">
                    <Progress
                        value={100}
                        className="h-3 rounded-full bg-gray-100 [&>*]:bg-blue-600"
                    />
                    <p className="text-sm text-red-600 mt-2">
                        You have used all your tokens for this feature. Please upgrade your plan to continue using this feature.
                    </p>
                </div>
            </div >
        );
    }


    // simplify below
    // either feature state or "no access" state
    //  return isFeatureEnabled ? <Feature /> : <NoAccess />;

    if (!isFeatureEnabled) {
        return (
            <div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    </div>

                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-500">Feature Disabled</span>
                    </div>

                    <div className="relative">
                        <Progress
                            value={100}
                            className="h-3 rounded-full bg-gray-100"
                        />
                        <p>Upgrade to use this feature</p>
                    </div>

                </div>
            </div>
        );
    }

    const progress = ((featureUsage ?? 0) / (featureAllocation ?? 1) * 100);

    const getProgressColor = (percent: number) => {
        if (percent >= 80) return "[&>*]:bg-red-600";
        if (percent >= 50) return "[&>*]:bg-yellow-500";
        return "[&>*]:bg-green-500";
    };

    const progressColor = getProgressColor(progress);

    if (progress >= 100) {
        usageMessage = (<p className="text-sm text-red-600 mt-2">
            You have used all your tokens for this feature. Please upgrade your plan to continue using this feature.
        </p>);
    } else if (progress >= 80) {
        usageMessage = (<p className="text-sm text-red-600 mt-2">
            Warning! You are approaching your usage limit.
        </p>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{featureUsage}</span>
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="font-medium text-gray-700">{featureAllocation}</span>
                </div>
            </div>


            <div className="relative">
                <Progress
                    value={progress}
                    className={`h-3 rounded-full bg-gray-100 ${progressColor}`}
                />
                {usageMessage}
                <div />
            </div>
            <div />
        </div>
    );


}

export default Usage;
