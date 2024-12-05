# Machine Learning Project

## Overview

This project leverages Artificial Intelligence (AI) to optimize climate-resilient agricultural practices. With the challenges posed by climate change, traditional farming methods are becoming increasingly unsustainable. By using K-Nearest Neighbors (KNN), this AI model predicts the most suitable crops for specific soil, climatic conditions, and weather patterns, aiming to enhance food security while promoting sustainable farming practices.

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
