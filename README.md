# Machine Learning Project

## Overview

This project leverages Artificial Intelligence (AI) to optimize climate-resilient agricultural practices. With the challenges posed by climate change, traditional farming methods are becoming increasingly unsustainable. By utilizing the **K-Nearest Neighbors (KNN)** algorithm, this AI model predicts the most suitable crops for specific soil, climatic conditions, and weather patterns. The goal is to enhance food security while promoting sustainable farming practices.

## Features

1. **Top 5 Crop Recommendations**  
   Predict the top 5 most feasible crops to grow in a region based on:  
   - Soil composition (NPK values)  
   - Climatic conditions (temperature, humidity, rainfall)  

2. **Growth Duration**  
   Provide details on the number of months required to grow each recommended crop.

3. **Revenue Prediction**  
   Estimate potential revenue by comparing the predicted harvest with historical market data, aligning with previous years' trends.
4. **Gemini Addon"
   Just added to provide best experience
   (Note: This ai interation is completly different and no where related to our trained model, we just added to make more better ux)

##Photos
![WhatsApp Image 2024-12-05 at 06 44 49_e176d19c](https://github.com/user-attachments/assets/69970efa-60bd-40d5-8b06-42f404494c7d)
![WhatsApp Image 2024-12-05 at 06 45 52_a3ff7a9b](https://github.com/user-attachments/assets/841fa4d0-7a94-4dbc-9179-7ba7e5f1fcf3)
![WhatsApp Image 2024-12-05 at 06 45 08_0e221500](https://github.com/user-attachments/assets/0191dc1b-f988-4cd5-910c-a4f81a389449)
![WhatsApp Image 2024-12-05 at 07 02 44_589df9f9](https://github.com/user-attachments/assets/e7c02cbf-f7d9-4e6c-ac73-a78fd7495dd2)


## Dataset

The project uses two datasets: Crop_Recommendation and Crop_Prices, which contain features relevant to predicting suitable crops for specific conditions. The datasets include the following key features:

N (Nitrogen)
P (Phosphorus)
K (Potassium)
Temperature
Humidity
pH
Rainfall
You can download the datasets from the following links:

- https://github.com/uttamseervi/hackathon/blob/main/backend/datasets/Crop_Prices_2023.csv
- https://github.com/uttamseervi/hackathon/blob/main/backend/datasets/Crop_recommendation.csv

## Installation

To run this project, clone this repository and install the required dependencies.

```bash
git clone https://github.com/uttamseervi/hackathon.git
cd hackathon
cd frontend
npm i
npm run dev // this will start the frontend

cd backend
cd nodeBackend
npm i 
npm run dev // this will run the node server

pip install flask scikit-learn
python main.py // runs the model server
