from datetime import datetime
from pydantic import BaseModel

class EndpointForm(BaseModel):
    name: str
    status: str
    expiry_date: datetime
    replacement_name: str
    action: str