from datetime import datetime
from pydantic import BaseModel


class PolicyForm(BaseModel):
    name: str
    status: str
    expiry_date: datetime
    replacement_name: str
    action: str
