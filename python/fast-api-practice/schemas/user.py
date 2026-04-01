from pydantic import BaseModel

class CreateUser(BaseModel):
  name: str
  role: str
  
class UserResponse(CreateUser):
  id: int