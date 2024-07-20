from flask import Flask, jsonify
from flask_cors import CORS
from controllers.task_controller import task_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(task_bp, url_prefix='/api/tasks')

@app.route('/')
def hello():
    return jsonify({"message": "Welcome to DevOpsGPT API"})

if __name__ == '__main__':
    app.run(debug=True)
