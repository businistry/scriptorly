from flask import Blueprint, jsonify, request
from models.project import Project

project_bp = Blueprint('projects', __name__)

@project_bp.route('/', methods=['GET'])
def get_projects():
    projects = Project.get_all()
    return jsonify([project.to_dict() for project in projects])

@project_bp.route('/', methods=['POST'])
def create_project():
    data = request.json
    project = Project.create(data['name'], data['description'])
    return jsonify(project.to_dict()), 201

@project_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.get_by_id(project_id)
    if project:
        return jsonify(project.to_dict())
    return jsonify({"error": "Project not found"}), 404
