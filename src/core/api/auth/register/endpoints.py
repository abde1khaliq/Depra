from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.api.auth.register.operations import create_user
from core.api.auth.register.schemas import RegisterationForm
from core.database.session import get_db

router = APIRouter()

@router.post('/register')
def register_route(form: RegisterationForm, db: Session = Depends(get_db)):
    return create_user(db, form)