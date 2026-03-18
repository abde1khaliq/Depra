from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.api.auth.login_route.operations import authenticate
from core.api.auth.login_route.schemas import LoginForm
from core.database.session import get_db

router = APIRouter()

@router.post('/login')
def login_route(form: LoginForm ,db: Session = Depends(get_db)):
    return authenticate(db, form)