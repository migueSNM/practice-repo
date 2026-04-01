from fastapi import APIRouter, Depends, HTTPException
from schemas.item import ItemCreate, ItemResponse
from typing import List
from sqlalchemy.orm import Session
from database.connection import get_db
from models.item import Item

# APIRouter groups all /items endpoints together
router = APIRouter(prefix="/items", tags=["Items"])

# In-memory "database" — just a list for simplicity
# db: List[dict] = []

@router.get("/", response_model=List[ItemResponse])
def get_all_items(db: Session = Depends(get_db)):
  return db.query(Item).all()

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
  # Find item by id, raise 404 if not found
  item = db.query(Item).filter(Item.id == item_id).first()
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  return item

@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
  new_item = Item(**item.model_dump())
  db.add(new_item)
  db.commit()
  db.refresh(new_item)
  return new_item

@router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, updated: ItemCreate, db: Session = Depends(get_db)):
  item = db.query(Item).filter(Item.id == item_id).first()
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  for key, value in updated.model_dump().items():
    setattr(item, key, value)
  db.commit()
  db.refresh(item)
  return item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
  item = db.query(Item).filter(Item.id == item_id).first()
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  db.delete(item)
  db.commit()
  return {"message": f"Item {item_id} deleted"}
