from flask import Blueprint, jsonify, request
from models.requirement import Requirement

requirement_bp = Blueprint('requirements', __name__)

@requirement_bp.route('/', methods=['POST'])
def create_requirement():
    data = request.json
    requirement = Requirement.create(data['project_id'], data['description'])
    return jsonify(requirement.to_dict()), 201

@requirement_bp.route('/<int:project_id>', methods=['GET'])
def get_requirements(project_id):
    requirements = Requirement.get_by_project(project_id)
    return jsonify([req.to_dict() for req in requirements])
