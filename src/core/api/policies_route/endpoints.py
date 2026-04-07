from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.policies_route.schemas import PolicyForm
from api.policies_route.operations import create_policy
from database.models.users import User
from utils.tokens import get_user
from database.session import get_db

router = APIRouter()


@router.post("/policies")
def create_policy_route(
        form: PolicyForm, db: Session = Depends(get_db), current_user_id: int = Depends(get_user)):
    return create_policy(form, db, current_user_id)


@router.get("/policies")
def get_policies(db: Session = Depends(get_db), current_user_id: int = Depends(get_user)):
    user = db.query(User).filter(User.id == current_user_id).first()
    return user.policies
