from typing import Optional, List
from pydantic import BaseModel
from fastapi import APIRouter

event_router = APIRouter(
  prefix="/events",
  tags=["Events"]
)

class Event(BaseModel):
  title: str
  description: str
  tags: List[str] = []

# In memory db
events_db = []

@event_router.get("/")
def list_events(page: int = 1, limit: int = 10, active: Optional[bool] = None):
  return {"page": page, "limit": limit, "active_filter": active, "events": []}

@event_router.get("/{event_id}")
def get_event(event_id: int):
  return {"event_id": event_id}

@event_router.post("/new", status_code=201)
def create_event(event: Event):
  events_db.append(event)
  return event
