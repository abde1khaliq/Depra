from fastapi import Request, Response
from sqlalchemy.orm import Session
from core.database.session import get_db
import httpx
import datetime


async def proxy_middleware(request: Request, call_next):
    db: Session = next(get_db())
    path = request.url.path
    method = request.method

    policy = db.query()
