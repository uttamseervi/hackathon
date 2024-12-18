from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split

app = Flask(__name__)

# Load the crop prediction model
model_path = "./pickle_files/knn.pkl"
with open(model_path, "rb") as file:
    crop_model = pickle.load(file)

# Crop dictionary (encoding: crop names to integers)
crop_dict = {
    'rice': 1, 'maize': 2, 'jute': 3, 'cotton': 4, 'coconut': 5, 'papaya': 6,
    'orange': 7, 'apple': 8, 'muskmelon': 9, 'watermelon': 10, 'grapes': 11,
    'mango': 12, 'banana': 13, 'pomegranate': 14, 'lentil': 15, 'blackgram': 16,
    'mungbean': 17, 'mothbeans': 18, 'pigeonpeas': 19, 'kidneybeans': 20,
    'chickpea': 21, 'coffee': 22
}

# Reverse crop dictionary: map encoded values back to crop names
reversed_crop_dict = {value: key for key, value in crop_dict.items()}

# Crop growth durations in months
crop_growth_duration = {
    "rice": 4, "maize": 3, "jute": 4, "cotton": 6, "coconut": 12, "papaya": 10,
    "orange": 8, "apple": 8, "muskmelon": 3, "watermelon": 3, "grapes": 7, 
    "mango": 12, "banana": 9, "pomegranate": 6, "lentil": 4, "blackgram": 3,
    "mungbean": 3, "mothbeans": 3, "pigeonpeas": 5, "kidneybeans": 4, "chickpea": 5,
    "coffee": 12
}

# Predicted crop price trends (price/kg for the next 12 months)
crop_prices_dict = {
    "rice": [100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
    "maize": [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135],
    "jute": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
    "cotton": [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
    "coconut": [200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255],
    "papaya": [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
    "orange": [120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175],
    "apple": [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205],
    "muskmelon": [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
    "watermelon": [100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
    "grapes": [180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235],
    "mango": [250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305],
    "banana": [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
    "pomegranate": [200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255],
    "lentil": [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
    "blackgram": [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
    "mungbean": [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
    "mothbeans": [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
    "pigeonpeas": [100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
    "kidneybeans": [120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175],
    "chickpea": [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135],
    "coffee": [200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310]
}

# Utility to map encoded values to crop names
def get_crop_name(encoded_value):
    return reversed_crop_dict.get(encoded_value, "Unknown Crop")

@app.route('/api/submit', methods=['POST'])
def submit():
    try:
        data = request.json  # Get the input JSON data

        # You can perform any required operations or predictions here

        return jsonify({"message": "Data received successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/dummy', methods=['GET'])
def dummy():
    try:
        # Load the dataset (assuming it's a CSV file, update the path if necessary)
        df = pd.read_csv("./datasets/Crop_recommendation.csv")
        
        # Split the dataset into features and labels (assuming your CSV has 'features' and 'labels')
        X = df.drop('label', axis=1)  # Assuming 'label' is the column to predict (adjust as necessary)
        y = df['label']  # The target variable (crop names or integers)
        
        # Split the data into training and testing sets (80% train, 20% test)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Use the model to predict on the test data
        predictions = crop_model.predict(X_test)  # Predict crop labels from X_test
        
        # Print predictions for testing (you can replace this with return statements or logging if needed)
        for idx, prediction in enumerate(predictions):
            print(f"Test Sample {idx}: Predicted Crop: {get_crop_name(prediction)}")

        return jsonify({"message": "Predictions printed to console."}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Error occurred while processing: {str(e)}"}), 500


@app.route('/predict_top5', methods=['POST'])
def predict_top5():
    try:
        data = request.json
        print("the data from node is ", data)

        # Convert string inputs to the appropriate numerical types
        features = [
            int(data['n']),             # Nitrogen, converting to integer
            int(data['p']),             # Phosphorus, converting to integer
            int(data['k']),             # Potassium, converting to integer
            float(data['temperature']), # Temperature, converting to float
            float(data['humidity']),    # Humidity, converting to float
            float(data['ph']),          # pH, converting to float
            float(data['rainfall'])     # Rainfall, converting to float
        ]

        # Predict probabilities using the loaded model
        probabilities = crop_model.predict_proba([features])[0]

        # Sort the probabilities and select the top 5 crops
        sorted_indices = probabilities.argsort()[-5:][::-1]

        # Prepare the crop information
        top5_crops = []
        for index in sorted_indices:
            crop_name = get_crop_name(index + 1)  # +1 to match the encoding of crop names
            growth_duration = crop_growth_duration.get(crop_name, "Unknown")
            price_list = crop_prices_dict.get(crop_name, [])
            predicted_price = (
                price_list[growth_duration - 1] if price_list and isinstance(growth_duration, int) else "Unknown"
            )

            crop_info = {
                "crop": crop_name,
                "growth_duration_months": growth_duration,
                "predicted_price_per_kg": predicted_price,
            }

            # Add potential profit if area is provided in the input data
            if "area" in data and predicted_price != "Unknown":
                area = float(data["area"])  # Convert area to float
                yield_per_hectare = 2000  # Example: fixed value for yield per hectare
                total_profit = area * yield_per_hectare * predicted_price
                crop_info["area_hectares"] = area
                crop_info["total_profit"] = total_profit

            top5_crops.append(crop_info)

        return jsonify({"top_5_crops": top5_crops})

    except KeyError as e:
        return jsonify({"error": f"Missing expected input: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Invalid value for input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
