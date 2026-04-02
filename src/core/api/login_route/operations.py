from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from api.login_route.schemas import LoginForm
from database.models.users import User
from utils.pwd_hash import verify_password
from utils.tokens import create_access_token

def authenticate(db: Session, form: LoginForm):
    user = db.query(User).filter(User.email == form.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    if not verify_password(form.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password.")
    
    access = create_access_token(
        data={'user_id': user.id, "email": user.email}
    )

    return { 'access' : access, "refresh": ''}