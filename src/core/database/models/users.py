from sqlalchemy import Column, Integer, String, null
from sqlalchemy.orm import relationship
from database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    endpoints = relationship("Endpoint", back_populates="owner")