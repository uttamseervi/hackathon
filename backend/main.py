# model_path = "./pickle_files/model.pkl"

from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the crop prediction model
model_path = "./pickle_files/model.pkl"
with open(model_path, "rb") as file:
    crop_model = pickle.load(file)

# Crop dictionary (encoding: crop names to integers)
crop_dict = {
    'rice': 1,
    'maize': 2,
    'jute': 3,
    'cotton': 4,
    'coconut': 5,
    'papaya': 6,
    'orange': 7,
    'apple': 8,
    'muskmelon': 9,
    'watermelon': 10,
    'grapes': 11,
    'mango': 12,
    'banana': 13,
    'pomegranate': 14,
    'lentil': 15,
    'blackgram': 16,
    'mungbean': 17,
    'mothbeans': 18,
    'pigeonpeas': 19,
    'kidneybeans': 20,
    'chickpea': 21,
    'coffee': 22
}

# Reverse crop dictionary: map encoded values back to crop names
reversed_crop_dict = {value: key for key, value in crop_dict.items()}

# Crop growth durations in months
crop_growth_duration = {
    "rice": 4,
    "maize": 3,
    "jute": 4,
    "cotton": 6,
    "coconut": 12,
    "papaya": 10,
    "orange": 8,
    "apple": 8,
    "muskmelon": 3,
    "watermelon": 3,
    "grapes": 7,
    "mango": 12,
    "banana": 9,
    "pomegranate": 6,
    "lentil": 4,
    "blackgram": 3,
    "mungbean": 3,
    "mothbeans": 3,
    "pigeonpeas": 5,
    "kidneybeans": 4,
    "chickpea": 5,
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

@app.route('/predict_top5', methods=['POST'])
def predict_top5():
    try:
        data = request.json

        # Extract features from request
        features = [
            data['n'], data['p'], data['k'], data['temperature'], 
            data['humidity'], data['ph'], data['rainfall']
        ]

        # Predict probabilities
        probabilities = crop_model.predict_proba([features])[0]

        # Get sorted indices of probabilities
        sorted_indices = probabilities.argsort()[-5:][::-1]

        # Map indices to crop names and calculate revenue
        top5_crops = []
        for index in sorted_indices:
            crop_name = get_crop_name(index + 1)  # +1 to match encoding
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

            # Add potential profit if area is provided
            if "area" in data and predicted_price != "Unknown":
                area = data["area"]  # in hectares
                yield_per_hectare = 2000  # Example: fixed value for yield per hectare
                total_profit = area * yield_per_hectare * predicted_price
                crop_info["area_hectares"] = area
                crop_info["total_profit"] = total_profit

            top5_crops.append(crop_info)

        return jsonify({"top_5_crops": top5_crops})


    except KeyError as e:
        return jsonify({"error": f"Missing input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
