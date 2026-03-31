from fastapi import FastAPI
from routes.events import event_router

app = FastAPI()
app.include_router(event_router)

@app.get('/')
def read_root():
  return {"message": "Hello world!"}

@app.get("/hello/{name}")
def greet(name: str):
  return {"greeting": f"Hello, {name}!"}

@app.get("/users/{user_id}/orders/{order_id}")
def get_order(user_id: int, order_id: int):
  return {"user_id": user_id, "order_id": order_id}

@app.get("/search")
def search(q: str):
  return {"query": q}
