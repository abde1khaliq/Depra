from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.endpoints_route.schemas import EndpointForm
from api.endpoints_route.operations import create_endpoint
from database.models.users import User
from utils.tokens import get_user
from database.session import get_db

router = APIRouter()

@router.post("/endpoints")
def create_endpoint_route(
    form: EndpointForm, db: Session = Depends(get_db), current_user_id: int = Depends(get_user)):
    return create_endpoint(form, db, current_user_id)

@router.get("/endpoints")
def get_endpoints(db: Session = Depends(get_db), current_user_id: int = Depends(get_user)):
    user = db.query(User).filter(User.id == current_user_id).first()
    return user.endpoints