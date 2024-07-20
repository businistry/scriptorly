from flask import Blueprint, jsonify, request
from services.code_generation_service import generate_code

code_generation_bp = Blueprint('code_generation', __name__)

@code_generation_bp.route('/', methods=['POST'])
def generate():
    data = request.json
    generated_code = generate_code(data['requirement_id'])
    return jsonify({"generated_code": generated_code}), 200
