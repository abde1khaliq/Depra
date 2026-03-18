
from fastapi import HTTPException
from sqlalchemy.orm import Session
from api.endpoints_route.schemas import EndpointForm
from database.models.endpoints import Endpoint
from database.models.users import User


def create_endpoint(form: EndpointForm, db: Session, current_user_id):
    user = db.query(User).filter(User.id == current_user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")


    endpoint_exists = (
        db.query(Endpoint)
        .filter(Endpoint.name == form.name, Endpoint.owner_id == user.id)
        .first()
    )
    if endpoint_exists:
        raise HTTPException(status_code=400, detail="This endpoint already exists for this user.")


    new_endpoint = Endpoint(
        name=form.name,
        status=form.status,
        expiry_date=form.expiry_date,
        replacement_name=form.replacement_name,
        action=form.action,
        owner_id=user.id,
    )
    db.add(new_endpoint)
    db.commit()
    db.refresh(new_endpoint)

    return {"success": "Endpoint successfully created."}
