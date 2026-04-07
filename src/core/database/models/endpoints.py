from sqlalchemy import String, Integer, Column, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database.session import Base
import enum


class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    status = Column(String, default='active',
                    nullable=False, index=True)
    expiry_date = Column(DateTime, nullable=True)
    replacement_name = Column(String, nullable=True)
    action = Column(String, default='let',
                    nullable=False, index=True)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationship to User
    owner = relationship("User", back_populates="policies")
