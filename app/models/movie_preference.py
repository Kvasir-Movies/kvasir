import enum

from app import db
from sqlalchemy import Column, Enum, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship


class PreferenceTypes(enum.Enum):
    positive = "positive"
    negative = "negative"


class MoviePreference(db.Model):
    __tablename__ = "movie_preferences"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    external_movie_id = Column(String(20), nullable=False)
    preference_type = Column(
        Enum(PreferenceTypes), nullable=False, default=PreferenceTypes.positive
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id", "external_movie_id", name="user_and_external_movie"
        ),
    )

    user = relationship("User", back_populates="movie_preferences")

    def __init__(
        self, user, external_movie_id, preference_type=PreferenceTypes.positive
    ):
        self.user = user
        self.external_movie_id = external_movie_id
        self.preference_type = preference_type

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "externalMovieId": self.external_movie_id,
            "preferenceType": self.preference_type.value,
        }
