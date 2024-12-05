import React, { useEffect, useState } from 'react';
import dashboardImage from "../../assets/dashboardImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLatitude, setLongitude } from "../../store/locationSlice";  // Import the actions

function Dashboard() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const latitudes = useSelector((state) => state.location.latitude);
    const longitudes = useSelector((state) => state.location.longitude);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;


                    dispatch(setLatitude(latitude));
                    dispatch(setLongitude(longitude));


                    setLocation({ latitude, longitude });
                },
                (err) => {
                    setError("Unable to retrieve location.");
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, [dispatch]);

    console.log("Current Location:", location);
    console.log("Latitude from Redux:", latitudes);
    console.log("Longitude from Redux:", longitudes);

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${dashboardImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-content flex-col lg:flex-row">
                <div>
                    <h1 className="text-5xl font-bold text-white">Welcome to HarvestGuard!</h1>
                    <p className="py-6 text-white font-semibold">
                        We empower farmers with AI-driven insights to adapt to climate change. Our platform provides personalized crop recommendations, sustainable farming methods, and climate forecasts to help you thrive in shifting agricultural conditions.
                    </p>
                    <Link to="/predict">
                        <button className="btn btn-primary">Start Predicting</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
