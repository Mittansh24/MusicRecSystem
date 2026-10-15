from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route("/music")
def music():
    mood = request.args.get("mood")
    query = mood + " songs"

    url = f"https://api.deezer.com/search?q={query}"
    res = requests.get(url)

    return jsonify(res.json())

app.run(debug=True)