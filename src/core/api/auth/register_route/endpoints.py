from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.auth.register_route.operations import create_user
from api.auth.register_route.schemas import RegisterationForm
from database.session import get_db

router = APIRouter()

@router.post('/register')
def register_route(form: RegisterationForm, db: Session = Depends(get_db)):
    return create_user(db, form)