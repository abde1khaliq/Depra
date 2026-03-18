
from fastapi import HTTPException
from sqlalchemy.orm import Session
from core.api.auth.register.schemas import RegisterationForm
from core.database.models.users import User
from core.utils.pwd_hash import hash_password


def create_user(db: Session, form: RegisterationForm):
    user_exists = db.query(User).filter(User.email == form.email).first()

    if user_exists:
        raise HTTPException(status_code=400, detail='This email is already registered.')

    hashed_password = hash_password(form.password)

    created_user = User(
        username=form.username,
        first_name=form.first_name,
        last_name=form.last_name,
        email=form.email,
        password=hashed_password
    )
    db.add(created_user)
    db.commit()
    db.refresh(created_user)

    return {'success': 'User was created.'}