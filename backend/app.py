
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/status", methods=["GET"])
def status():
    return jsonify({
        "sistema": "METAL SYSTEM",
        "mensagem": "API Flask funcionando!",
        "status": "online"
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
