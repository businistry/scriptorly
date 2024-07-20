from datetime import datetime

class Requirement:
    requirements = []

    def __init__(self, id, project_id, description, created_at):
        self.id = id
        self.project_id = project_id
        self.description = description
        self.created_at = created_at

    @classmethod
    def create(cls, project_id, description):
        requirement_id = len(cls.requirements) + 1
        requirement = cls(requirement_id, project_id, description, datetime.now())
        cls.requirements.append(requirement)
        return requirement

    @classmethod
    def get_by_project(cls, project_id):
        return [req for req in cls.requirements if req.project_id == project_id]

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'description': self.description,
            'created_at': self.created_at.isoformat()
        }
