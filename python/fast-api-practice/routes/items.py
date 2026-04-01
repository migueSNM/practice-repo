from fastapi import APIRouter, HTTPException
from schemas.item import ItemCreate, ItemResponse
from typing import List

# APIRouter groups all /items endpoints together
router = APIRouter(prefix="/items", tags=["Items"])

# In-memory "database" — just a list for simplicity
db: List[dict] = []

@router.get("/", response_model=List[ItemResponse])
def get_all_items():
  return db

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int):
  # Find item by id, raise 404 if not found
  item = next((i for i in db if i["id"] == item_id), None)
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  return item

@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate):
  new_item = {"id": len(db) + 1, **item.model_dump()}
  db.append(new_item)
  return new_item

@router.put("/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, updated: ItemCreate):
  item = next((i for i in db if i["id"] == item_id), None)
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  item["name"] = updated.name
  item["price"] = updated.price
  item["description"] = updated.description
  return item

@router.delete("/{item_id}")
def delete_item(item_id: int):
  item = next((i for i in db if i["id"] == item_id), None)
  if not item:
    raise HTTPException(status_code=404, detail="Item not found")
  db.remove(item)
  return {"message": f"Item {item_id} deleted"}
