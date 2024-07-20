from flask import Blueprint, jsonify, request
from models.task import Task

task_bp = Blueprint('tasks', __name__)

@task_bp.route('/', methods=['GET'])
def get_tasks():
    project_id = request.args.get('project_id')
    if project_id:
        tasks = Task.get_by_project(int(project_id))
    else:
        tasks = Task.get_all()
    return jsonify([task.to_dict() for task in tasks])

@task_bp.route('/', methods=['POST'])
def create_task():
    data = request.json
    task = Task.create(data['title'], data['description'], data['project_id'])
    return jsonify(task.to_dict()), 201

@task_bp.route('/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    task = Task.update(task_id, data)
    if task:
        return jsonify(task.to_dict())
    return jsonify({"error": "Task not found"}), 404

@task_bp.route('/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if Task.delete(task_id):
        return '', 204
    return jsonify({"error": "Task not found"}), 404
