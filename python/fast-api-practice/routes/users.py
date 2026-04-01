from fastapi import APIRouter, HTTPException
from schemas.user import UserResponse, CreateUser
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

db: List[dict] = []

@router.get("/", response_model=List[UserResponse])
def get_all_users():
  return db
  
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
  user = next((i for i in db if i["id"] == user_id), None)
  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  return user

@router.post("/", status_code=201, response_model=UserResponse)
def create_user(user: CreateUser):
  new_user = {"id": len(db) + 1, **user.model_dump()}
  db.append(new_user)
  return new_user
  