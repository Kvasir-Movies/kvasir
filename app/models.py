from app import db
from app.util.password_util import hash_password
from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(64), nullable=False)
    movies = relationship("MoviePreference", back_populates="user")

    def __init__(self, email, password):
        self.email = email
        self.password_hash = hash_password(password)

    def __repr__(self):
        return '<User {}: {}>'.format(self.id, self.email)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email
        }


class MoviePreference(db.Model):
    __tablename__ = 'movie_preferences'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    external_movie_id = Column(String(20), nullable=False)

    UniqueConstraint('user_id', 'external_movie_id')

    user = relationship("User", back_populates="movies")

    def __init__(self, user, external_movie_id):
        self.user = user
        self.external_movie_id = external_movie_id

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'external_movie_id': self.external_movie_id
        }
