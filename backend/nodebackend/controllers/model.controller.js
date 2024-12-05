import express, { urlencoded } from "express";
import { Router } from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

// Load environment variables from .env file
dotenv.config();

app.use(cors({
    origin: '*',  // Allows all origins
    methods: ['GET', 'POST'],  // Allowed methods
    allowedHeaders: ['Content-Type'],  // Allowed headers
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));

// Initialize router
const router = Router();

router.post('/submit', async (req, res) => {
    
    console.log("Received request at /submit endpoint");
    
    const { n, p, k, humidity, ph, temperature, area, lat, long,rainfall } = req.body;


    if (!n || !p || !k || !humidity || !ph || !temperature || !area || !lat || !long || !rainfall) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    console.log("Form Data: ", { n, p, k, humidity, ph, temperature, area, lat, long,rainfall });

    try {
        // Make an external API call to a prediction service with the received data
        const predictionResponse = await axios.post('http://127.0.0.1:5000/predict_top5', {
            n,
            p,
            k,
            humidity,
            ph,
            temperature,
            area,
            rainfall
        });

        console.log("Prediction Response: ", predictionResponse.data);

        // Process and return the prediction data
        const processedData = predictionResponse.data;  // Assuming this contains the prediction result
        return res.status(200).json({
            message: 'Data processed successfully',
            processedData: processedData
        });
    } catch (error) {
        console.error("Error while processing data:", error);
        return res.status(500).json({ message: 'An error occurred while processing data' });
    }
});

// Attach the router to the app
app.use("/api", router);

// Start the server
const PORT = process.env.PORT || 8000;  // Use environment variable or default to 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
