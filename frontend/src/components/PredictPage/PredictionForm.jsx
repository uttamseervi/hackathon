import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function PredictionForm() {
    const [data, setData] = useState(null);
    const latitude = useSelector((state) => state.location.latitude);
    const longitude = useSelector((state) => state.location.longitude);
    const [formData, setFormData] = useState({
        n: '',
        p: '',
        k: '',
        humidity: '',
        ph: '',
        temperature: '',
        area: '',
        rainfall:'',
        lat: latitude,
        long: longitude
    });

    // Fetch weather data using useEffect
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
                );
                setData(response.data); // Store the fetched data in the state
                console.log('Weather Data:', response);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (latitude && longitude) {
            fetchWeatherData(); // Fetch data only if latitude and longitude are available
        }
    }, [latitude, longitude]); // Re-run the effect if latitude or longitude changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted: ', formData);
        // Here you can send the formData to your backend API
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold text-center mb-6">Soil Health Input</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="nitrogen" className="font-semibold">
                        Nitrogen Content (kg/ha):
                    </label>
                    <input
                        type="number"
                        id="nitrogen"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="phosphorus" className="font-semibold">
                        Phosphorus Content (kg/ha):
                    </label>
                    <input
                        type="number"
                        id="phosphorus"
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="potassium" className="font-semibold">
                        Potassium Content (kg/ha):
                    </label>
                    <input
                        type="number"
                        id="potassium"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="soilHumidity" className="font-semibold">
                        Soil Humidity (%):
                    </label>
                    <input
                        type="number"
                        id="soilHumidity"
                        name="soilHumidity"
                        value={formData.soilHumidity}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="soilPH" className="font-semibold">
                        Soil pH Level:
                    </label>
                    <input
                        type="number"
                        id="soilPH"
                        name="soilPH"
                        value={formData.soilPH}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                        step="0.1"
                        min="0"
                        max="14"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="organicMatter" className="font-semibold">
                        Organic Matter (%):
                    </label>
                    <input
                        type="number"
                        id="organicMatter"
                        name="organicMatter"
                        value={formData.organicMatter}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="soilTemperature" className="font-semibold">
                        Soil Temperature (°C):
                    </label>
                    <input
                        type="number"
                        id="soilTemperature"
                        name="soilTemperature"
                        value={formData.soilTemperature}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                        step="0.1"
                    />
                </div>

                {/* New Field for Area of Land */}
                <div className="flex flex-col">
                    <label htmlFor="areaOfLand" className="font-semibold">
                        Area of Land (hectares):
                    </label>
                    <input
                        type="number"
                        id="areaOfLand"
                        name="areaOfLand"
                        value={formData.areaOfLand}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                    />
                </div>

                <div className="flex justify-center ">
                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PredictionForm;
