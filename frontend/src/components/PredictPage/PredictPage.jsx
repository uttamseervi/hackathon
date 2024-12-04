import React, { useState } from "react";
import { PredictionForm } from "../index";

function SoilInputForm() {
    const [loading, setLoading] = useState(true);

    // You can trigger the loading state with some event, for example:
    // useEffect or a button click can set setLoading(true);

    return (
        <main className="flex gap-2 items-center justify-center">
            <div className="w-1/2">
                <PredictionForm />
            </div>
            {loading && (
                <div className="flex justify-center items-center space-x-2">
                    <div className="animate-arrowMovement opacity-100 text-5xl">→</div>
                    <div className="animate-arrowMovement opacity-100 delay-500 text-5xl">→</div>
                    <div className="animate-arrowMovement opacity-100 delay-1000 text-5xl">→</div>
                </div>
            )}
            <div id="result" className="w-1/4 min-h-60 bg-base-300 p-4 rounded-md overflow-y-scroll">
                {loading ? (
                    <p className="text-center text-lg text-gray-600">Please wait, we are processing your request...</p>
                ) : (
                    <p className="text-center text-lg text-gray-600">Results will appear here once processed.</p>
                )}
            </div>
        </main>
    );
}

export default SoilInputForm;
