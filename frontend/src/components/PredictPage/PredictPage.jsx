import React, { useState } from "react";
import { PredictionForm } from "../index";

function SoilInputForm() {
    const [loading, setLoading] = useState(true);

    const data = [
        {


            "area_hectares": 2,
            "crop": "apple",
            "growth_duration_months": 8,
            "predicted_price_per_kg": 185,
            "total_profit": 740000
        },
        {
            "area_hectares": 2,
            "crop": "papaya",
            "growth_duration_months": 10,
            "predicted_price_per_kg": 95,
            "total_profit": 380000
        },
        {
            "area_hectares": 2,
            "crop": "grapes",
            "growth_duration_months": 7,
            "predicted_price_per_kg": 210,
            "total_profit": 840000
        },
        {
            "area_hectares": 2,
            "crop": "banana",
            "growth_duration_months": 9,
            "predicted_price_per_kg": 90,
            "total_profit": 360000
        },
        {
            "area_hectares": 2,
            "crop": "muskmelon",
            "growth_duration_months": 3,
            "predicted_price_per_kg": 100,
            "total_profit": 400000
        }


    ]
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
            <div id="result" className="w-1/4 max-h-svh bg-base-300 p-4 rounded-md overflow-auto">
                {loading ? (
                    <p className="text-center text-lg text-gray-600">Please wait, we are processing your request...</p>
                ) : (
                    <p className="text-center text-lg text-gray-600">Results will appear here once processed.</p>
                )}
                <div id="ans" className="">
                    <div className="card bg-base-100 w-full shadow-xl flex flex-col items-center justify-center  gap-2">
                        {
                            data.map((item, index) => (
                                <div className="card-body" key={index}>
                                    <h2 className="card-title">Crop Name: {item.crop}</h2>
                                    <p>Price Per Kg: {item.predicted_price_per_kg}</p>
                                    <p>Total Profit: ₹ {item.total_profit} </p>
                                    <p>Area (in hectares): {item.area_hectares}</p>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SoilInputForm;
