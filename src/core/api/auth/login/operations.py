from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from core.api.auth.login.schemas import LoginForm

def authenticate(db: Session, form: LoginForm):
    pass