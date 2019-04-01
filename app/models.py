import enum

from app import db
from app.util.password_util import hash_password
from sqlalchemy import Column, Enum, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship


class Friendship(db.Model):
    """Models friendships between two users. Each Friendship object is a one-way relationship
    (to make querying and management easier). Friendship objects should be added in pairs,
    one for each user.
    """
    __tablename__ = 'friendships'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    friend_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint('user_id', 'friend_id', name='user_and_friend'),
    )

    user = relationship("User", foreign_keys=[user_id], back_populates="friendships")
    friend = relationship("User", foreign_keys=[friend_id])

    def __init__(self, user, friend):
        self.user = user
        self.friend = friend


class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(64), nullable=False)
    movies = relationship("MoviePreference", back_populates="user")
    friendships = relationship("Friendship", foreign_keys=[Friendship.user_id], back_populates="user")

    def __init__(self, email, password):
        self.email = email
        self.password_hash = hash_password(password)

    def __repr__(self):
        return '<User {}: {}>'.format(self.id, self.email)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'friends': [friendship.friend.email for friendship in self.friendships]
        }

class PreferenceTypes(enum.Enum):
    positive = 'positive'
    negative = 'negative'


class MoviePreference(db.Model):
    __tablename__ = 'movie_preferences'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    external_movie_id = Column(String(20), nullable=False)
    preference_type = Column(Enum(PreferenceTypes), nullable=False, default=PreferenceTypes.positive)

    __table_args__ = (
        UniqueConstraint('user_id', 'external_movie_id', name='user_and_external_movie'),
    )

    user = relationship("User", back_populates="movies")

    def __init__(self, user, external_movie_id, preference_type=PreferenceTypes.positive):
        self.user = user
        self.external_movie_id = external_movie_id
        self.preference_type = preference_type

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'external_movie_id': self.external_movie_id,
            'preferenceType': self.preference_type.value,
        }
