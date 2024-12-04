import express from "express";
import { Router } from "express";
import axios from 'axios'; 

const app = express();
app.use(express.json());  

const router = Router();

router.post('/submit', async (req, res) => {
    const { n, p, k, humidity, ph, temperature, area } = req.body;

    if (!n || !p || !k || !humidity || !ph || !temperature || !area) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Make the external POST request with the data
        const response = await axios.post('https://example.com/api', {
            n,
            p,
            k,
            humidity,
            ph,
            temperature,
            area
        });


        const processedData = response.data;


        return res.status(200).json({
            message: 'Data processed successfully',
            processedData: processedData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while processing data' });
    }
});

app.use("/api", router);  

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
