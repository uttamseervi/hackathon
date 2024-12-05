import React, { useState } from "react";
import { PredictionForm } from "../index";
import { useSelector } from "react-redux";
function SoilInputForm() {
    const [loading, setLoading] = useState(true);
    const predictedData = useSelector((state) => state.modelData.data)
    console.log("the predicted data is", predictedData)

 
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
                            predictedData.map((item, index) => (
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
