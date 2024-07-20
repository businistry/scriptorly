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
from flask import Flask, jsonify, request
from flask_cors import CORS
from controllers.project_controller import project_bp
from controllers.requirement_controller import requirement_bp
from controllers.code_generation_controller import code_generation_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(project_bp, url_prefix='/api/projects')
app.register_blueprint(requirement_bp, url_prefix='/api/requirements')
app.register_blueprint(code_generation_bp, url_prefix='/api/code-generation')

@app.route('/')
def hello():
    return jsonify({"message": "Welcome to AutoDevOps API"})

if __name__ == '__main__':
    app.run(debug=True)
