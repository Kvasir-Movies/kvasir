from app import db
from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship


class Friendship(db.Model):
    """Models friendships between two users. Each Friendship object is a one-way relationship
    (to make querying and management easier). Friendship objects should be added in pairs,
    one for each user.
    """

    __tablename__ = "friendships"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    friend_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    __table_args__ = (UniqueConstraint("user_id", "friend_id", name="user_and_friend"),)

    user = relationship("User", foreign_keys=[user_id], back_populates="friendships")
    friend = relationship("User", foreign_keys=[friend_id])

    def __init__(self, user, friend):
        self.user = user
        self.friend = friend
