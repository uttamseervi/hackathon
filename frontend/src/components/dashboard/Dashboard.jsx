import React, { useEffect, useState } from 'react'
import dashboardImage from "../../assets/dashboardImage.jpg"
import {Link} from "react-router-dom"
function dashboard() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (err) => {
                    setError("Unable to retrieve location.");
                }
            );
        }
        else {
            setError("Geolocation is not supported by this browser.");
        }
    }, [])
    console.log(location)



    return (
        <div
            className="hero min-h-screen"
            style={{ backgroundImage: `url(${dashboardImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="hero-content flex-col lg:flex-row">
                <div>
                    <h1 className="text-5xl font-bold text-white">Welcome to HarvestGuard!</h1>
                    <p className="py-6 text-white font-semibold">
                        we empower farmers with AI-driven insights to adapt to climate change. Our platform provides personalized crop recommendations, sustainable farming methods, and climate forecasts to help you thrive in shifting agricultural conditions.
                    </p>
                    <Link to= "/predict">
                        <button className="btn btn-primary">Start Predicting</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default dashboard
