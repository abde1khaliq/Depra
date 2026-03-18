from sqlalchemy import String, Integer, Column, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database.session import Base
import enum

class StatusEnum(str, enum.Enum):
    active = "active"
    deprecated = "deprecated"
    inactive = "inactive"


class ActionEnum(str, enum.Enum):
    let = "let"
    block = "block"

class Endpoint(Base):
    __tablename__ = "endpoints"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    status = Column(Enum(StatusEnum), default=StatusEnum.active,
                    nullable=False, index=True)
    expiry_date = Column(DateTime, nullable=True)
    replacement_name = Column(String, nullable=True)
    action = Column(Enum(ActionEnum), default=ActionEnum.let,
                    nullable=False, index=True)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationship to User
    owner = relationship("User", back_populates="entrypoints")
