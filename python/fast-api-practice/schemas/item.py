from pydantic import BaseModel
from typing import Optional

# BaseModel is Pydantic's base class. Any class that inherits from it gets automatic validation

# This is the shape of data we RECEIVE when creating an item
# FastAPI will reject requests that don't match this shape.
class ItemCreate(BaseModel):
  name: str
  price: float
  description: Optional[str] = None
  
# This is the shape of data we RETURN — includes the id
# ItemResponse EXTENDS ItemCreate by addind id
class ItemResponse(ItemCreate):
  id: int