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

4. **Gemini Addon**  
   An additional feature to enhance the user experience.  
   *(Note: This AI interaction is completely separate from the trained model and is included solely for improved UX.)*

## Photos

Below are some screenshots showcasing the project interface:

| ![Screenshot 1](https://github.com/user-attachments/assets/69970efa-60bd-40d5-8b06-42f404494c7d) | ![Screenshot 2](https://github.com/user-attachments/assets/841fa4d0-7a94-4dbc-9179-7ba7e5f1fcf3) |
|:------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------:|
| ![Screenshot 3](https://github.com/user-attachments/assets/0191dc1b-f988-4cd5-910c-a4f81a389449) | ![Screenshot 4](https://github.com/user-attachments/assets/e7c02cbf-f7d9-4e6c-ac73-a78fd7495dd2) |

## Dataset

The project uses two datasets: **Crop_Recommendation** and **Crop_Prices**, which include features relevant to predicting suitable crops for specific conditions. Key features include:  
- **N** (Nitrogen)  
- **P** (Phosphorus)  
- **K** (Potassium)  
- **Temperature**  
- **Humidity**  
- **pH**  
- **Rainfall**  

### Dataset Links:
- [Crop Prices 2023](https://github.com/uttamseervi/hackathon/blob/main/backend/datasets/Crop_Prices_2023.csv)  
- [Crop Recommendation](https://github.com/uttamseervi/hackathon/blob/main/backend/datasets/Crop_recommendation.csv)

## Installation

To run this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/uttamseervi/hackathon.git
   cd hackathon
2. **Run the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev  # Start the frontend server
3. **Run the Backend:**
   ```bash
   cd ../backend/nodeBackend
   npm install
   npm run dev  # Start the backend server
4. **Run the Model Server:**
   ```bash
   pip install flask scikit-learn
   python main.py  # Start the model server


