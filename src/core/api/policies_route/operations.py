
from fastapi import HTTPException
from sqlalchemy.orm import Session
from api.policies_route.schemas import PolicyForm
from database.models.endpoints import Policy
from database.models.users import User


def create_policy(form: PolicyForm, db: Session, current_user_id):
    user = db.query(User).filter(User.id == current_user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    policy_exists = (
        db.query(Policy)
        .filter(Policy.name == form.name, Policy.owner_id == user.id)
        .first()
    )
    if policy_exists:
        raise HTTPException(
            status_code=400, detail="This policy already exists for this user.")

    new_policy = Policy(
        name=form.name,
        status=form.status,
        expiry_date=form.expiry_date,
        replacement_name=form.replacement_name,
        action=form.action,
        owner_id=user.id,
    )
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)

    return {"success": "Policy successfully created."}
