import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setModelData } from '../../store/dataSlice';
import { useDispatch } from 'react-redux';
function PredictionForm() {
    const lat = useSelector((state) => state.location.latitude); // Get latitude from Redux state
    const long = useSelector((state) => state.location.longitude); // Get longitude from Redux state
    
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        n: "",
        p: "",
        k: "",
        humidity: "",
        ph: "",
        temperature: "",
        area: "",
        rainfall: "",
        lat, // Assign latitude value from Redux
        long, // Assign longitude value from Redux
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted: ', formData);
        // Send the form data to your backend API
        try {
            const response = await axios.post(`${import.meta.env.VITE_NODE_BACKEND_URL}/submit`, formData);
            console.log('Prediction Response:', response.data.processedData.top_5_crops
            );
            dispatch(setModelData(response.data.processedData.top_5_crops))
            
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold text-center mb-6">Soil Health Input</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex flex-col">
                    <label htmlFor="n" className="font-semibold">
                        Nitrogen Content (kg/ha):
                    </label>
                    <input
                        type="number"
                        id="n"
                        name="n"
                        value={formData.n}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="p" className="font-semibold">
                        Phosphorus Content (kg/ha):
                    </label>
                    <input
                        type="number"
                        id="p"
                        name="p"
                        value={formData.p}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="k" className="font-semibold">
                        Potassium Content (kg/ha):
                    </label>
                    <input
                        type="number"
                        id="k"
                        name="k"
                        value={formData.k}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="humidity" className="font-semibold">
                        Soil Humidity (%):
                    </label>
                    <input
                        type="number"
                        id="humidity"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ph" className="font-semibold">
                        Soil pH Level:
                    </label>
                    <input
                        type="number"
                        id="ph"
                        name="ph"
                        value={formData.ph}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                        step="0.1"
                        min="0"
                        max="14"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="temperature" className="font-semibold">
                        Soil Temperature (°C):
                    </label>
                    <input
                        type="number"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                        step="0.1"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="area" className="font-semibold">
                        Area of Land (hectares):
                    </label>
                    <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="rainfall" className="font-semibold">
                        Rainfall (mm):
                    </label>
                    <input
                        type="number"
                        id="rainfall"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PredictionForm;
