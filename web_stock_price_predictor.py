import streamlit as st
import pandas as pd
import numpy as np
from keras.models import load_model
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime

# Title
st.title("📈 Stock Price Predictor App")

# User input for stock ID
stock = st.text_input("Enter the Stock ID", "GOOG")

# Default start and end dates (Last 20 years)
end_default = datetime.now()
start_default = datetime(end_default.year - 20, end_default.month, end_default.day)

# User input for custom start and end dates
start_date = st.date_input("📅 Select Start Date:", value=start_default)
end_date = st.date_input("📅 Select End Date:", value=end_default)

# Convert to datetime format
start = datetime.combine(start_date, datetime.min.time())
end = datetime.combine(end_date, datetime.min.time())

# Fetch stock data
st.subheader(f"Fetching Stock Data for {stock} from {start.date()} to {end.date()}")
google_data = yf.download(stock, start=start, end=end)

# Load trained model
import os

model_path = r"C:\Defined\COLLAGE CLUBS\SEM 4\stock_price_prediction-main\stock_price_p\Latest_stock_price_model.keras"

# Check if the model file exists before loading
if os.path.exists(model_path):
    model = load_model(model_path)
    st.success("✅ Model loaded successfully!")
else:
    st.error(f"❌ Error: Model file not found at {model_path}")


# Display stock data
st.subheader("📊 Stock Data")
st.write(google_data.tail())

# Splitting Data
splitting_len = int(len(google_data) * 0.7)
x_test = pd.DataFrame(google_data.Close[splitting_len:])

# Function to plot graphs
def plot_graph(figsize, values, full_data, extra_data=0, extra_dataset=None):
    fig = plt.figure(figsize=figsize)
    plt.plot(values, 'Orange', label="Moving Average")
    plt.plot(full_data.Close, 'b', label="Close Price")
    if extra_data:
        plt.plot(extra_dataset, label="Comparison MA")
    plt.legend()
    return fig

# Moving Averages Visualization
st.subheader('📈 Close Price & 250-Day Moving Average')
google_data['MA_for_250_days'] = google_data.Close.rolling(250).mean()
st.pyplot(plot_graph((15, 6), google_data['MA_for_250_days'], google_data))

st.subheader('📈 Close Price & 200-Day Moving Average')
google_data['MA_for_200_days'] = google_data.Close.rolling(200).mean()
st.pyplot(plot_graph((15, 6), google_data['MA_for_200_days'], google_data))

st.subheader('📈 Close Price & 100-Day Moving Average')
google_data['MA_for_100_days'] = google_data.Close.rolling(100).mean()
st.pyplot(plot_graph((15, 6), google_data['MA_for_100_days'], google_data))

st.subheader('📈 100-Day vs 250-Day Moving Average Comparison')
st.pyplot(plot_graph((15, 6), google_data['MA_for_100_days'], google_data, 1, google_data['MA_for_250_days']))

# Data Preprocessing for Model
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(x_test[['Close']])

x_data = []
y_data = []

for i in range(100, len(scaled_data)):
    x_data.append(scaled_data[i-100:i])
    y_data.append(scaled_data[i])

x_data, y_data = np.array(x_data), np.array(y_data)

# Predictions
predictions = model.predict(x_data)
inv_pre = scaler.inverse_transform(predictions)
inv_y_test = scaler.inverse_transform(y_data)

# Prepare Data for Visualization
ploting_data = pd.DataFrame(
    {
        'original_test_data': inv_y_test.reshape(-1),
        'predictions': inv_pre.reshape(-1)
    },
    index=google_data.index[splitting_len+100:]
)

# Display Predicted vs Actual Data
st.subheader("🔍 Original vs Predicted Values")
st.write(ploting_data.tail())

# Visualization of Predictions
st.subheader('📉 Actual Close Price vs Predicted Close Price')
fig = plt.figure(figsize=(15, 6))
plt.plot(pd.concat([google_data.Close[:splitting_len+100], ploting_data], axis=0))
plt.legend(["Data- not used", "Original Test data", "Predicted Test data"])
st.pyplot(fig)
