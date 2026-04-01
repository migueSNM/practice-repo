from fastapi import FastAPI
from database.connection import engine, Base
from routes.items import router as item_router
from routes.users import router as user_router

Base.metadata.create_all(bind=engine)

# Create FastAPI instance
app = FastAPI(
    title="My first FastAPI",
    description="A basic API to learn FastAPI",
    version="1.0.0"
)

# Add routers
app.include_router(item_router)
app.include_router(user_router)

# Root endpoint, good for health checks
@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to FastAPI Practice"}
