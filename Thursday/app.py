import os
import google.generativeai as genai
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# You can also set this in an environment variable for security
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyDLpqxQVxLBE0ZZtqUCP0DGESHfy6qt60w")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")  # Or your preferred Gemini model

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    try:
        response = model.generate_content(user_message)
        answer = response.text
    except Exception as e:
        answer = f"Error from Gemini API: {str(e)}"
    return jsonify({"response": answer})

if __name__ == "__main__":
    app.run(debug=True)
