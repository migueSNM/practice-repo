from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List

app = FastAPI()

class Task(BaseModel):
    title: str = Field(...,min_length=3)
    description: Optional[str] = None
    completed: bool = False
    
class TaskResponse(Task):
    id: int

db: List = []

def get_first_task(task_id: int):
    for i in db:
        if i["id"] == task_id:
            return i
    return None

@app.get("/")
def root_greeting():
    return {"message": "Welcome"}

@app.get("/tasks", response_model=List[TaskResponse])
def get_all_tasks(completed: Optional[bool] = None):
    if completed is None:
        return db
    
    return [task for task in db if task["completed"] == completed]

@app.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(task_id: int):
    task = get_first_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.post("/tasks", response_model=TaskResponse, status_code=201)
def create_task(task: Task):
    for i in db:
        if i["title"] == task.title:
            raise HTTPException(status_code=400, detail=f"Found duplicated task with name {task.title}")
    
    new_task = {"id": len(db) + 1, **task.model_dump()}
    db.append(new_task)
    return new_task

@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, updated: Task):
    task = get_first_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.update({"id": task["id"], **updated.model_dump()})
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    task = get_first_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.remove(task)
    return {"message": "Task removed"}
