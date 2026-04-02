from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from dotenv import load_dotenv
import os, uuid

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET_KEY = os.getenv("SECRET_KEY", "fallbacksecretkeylmao")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=60)
    payload = {
        "user_id": data["user_id"],
        "email": data["email"],
        "exp": expire,
        "iat": datetime.utcnow(),
        "jti": str(uuid.uuid4()),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid Token.")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Token.")
