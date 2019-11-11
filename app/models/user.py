from app import db
from app.util.password_util import hash_password
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from . import Friendship


class User(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(64), nullable=False)
    movies = relationship("MoviePreference", back_populates="user")
    friendships = relationship(
        "Friendship", foreign_keys=[Friendship.user_id], back_populates="user"
    )

    def __init__(self, email, password):
        self.email = email
        self.password_hash = hash_password(password)

    def __repr__(self):
        return "<User {}: {}>".format(self.id, self.email)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "friends": [
                {"email": friendship.friend.email} for friendship in self.friendships
            ],
        }
