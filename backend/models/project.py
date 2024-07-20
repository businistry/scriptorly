from datetime import datetime

class Project:
    projects = []

    def __init__(self, id, name, description, created_at):
        self.id = id
        self.name = name
        self.description = description
        self.created_at = created_at

    @classmethod
    def create(cls, name, description):
        project_id = len(cls.projects) + 1
        project = cls(project_id, name, description, datetime.now())
        cls.projects.append(project)
        return project

    @classmethod
    def get_all(cls):
        return cls.projects

    @classmethod
    def get_by_id(cls, project_id):
        for project in cls.projects:
            if project.id == project_id:
                return project
        return None

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat()
        }
