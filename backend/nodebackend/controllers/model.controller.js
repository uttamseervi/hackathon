import express from "express"
import { Router } from "express";

const router = Router();

router.post('/submit', async (req, res) => {
    const { n, p, k, humidity, ph, temperature, area } = req.body;

    if (!n || !p || !k || !humidity || !ph || !temperature || !area) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    //
    const response = await axios.post('', {
        n,
        p,
        k,
        humidity,
        ph,
        temperature,
        area
    })



    res.status(200).json({
        message: 'Data processed successfully',
        processedData: {

        }
    });
});

module.exports = router;
