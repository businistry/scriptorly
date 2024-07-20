from datetime import datetime

class Task:
    tasks = []

    def __init__(self, id, title, description, created_at):
        self.id = id
        self.title = title
        self.description = description
        self.created_at = created_at

    @classmethod
    def create(cls, title, description):
        task_id = len(cls.tasks) + 1
        task = cls(task_id, title, description, datetime.now())
        cls.tasks.append(task)
        return task

    @classmethod
    def get_all(cls):
        return cls.tasks

    @classmethod
    def update(cls, task_id, data):
        for task in cls.tasks:
            if task.id == task_id:
                task.title = data.get('title', task.title)
                task.description = data.get('description', task.description)
                return task
        return None

    @classmethod
    def delete(cls, task_id):
        for i, task in enumerate(cls.tasks):
            if task.id == task_id:
                cls.tasks.pop(i)
                return True
        return False

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat()
        }
