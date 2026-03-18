from pydantic import BaseModel, EmailStr

class RegisterationForm(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    
    class Config:
        from_attributes = True