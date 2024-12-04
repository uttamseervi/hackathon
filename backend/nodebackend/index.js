// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());  

app.post('/api/soil-health', (req, res) => {
    const { nitrogen, phosphorus, potassium, soilHumidity, soilPH, organicMatter, soilTemperature, areaOfLand } = req.body;

    if (!nitrogen || !phosphorus || !potassium || !soilHumidity || !soilPH || !organicMatter || !soilTemperature || !areaOfLand) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const totalNutrients = nitrogen + phosphorus + potassium;

    res.status(200).json({
        message: 'Data processed successfully',
        processedData: {
            totalNutrients,
            soilQualityScore: (totalNutrients + soilHumidity + soilPH + organicMatter + soilTemperature) / 5, // Just a simple example
            areaOfLand
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
