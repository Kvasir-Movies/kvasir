from flask import jsonify, request

from app import db
from app.models import PreferenceTypes, User
from app.util.session_util import get_current_session_user
from app.util.tmdb_helpers import get_movie


class RecommendationController():
    def handle(self):
        emails = [email.strip() for email in request.args.get('emails').split(',')]
        users = set(User.query.filter(User.email.in_(emails)).all())
        users.add(get_current_session_user())

        positive_movie_id_sets = []
        negative_movie_id_sets = []

        for user in users:
            movie_preferences = user.movie_preferences
            positive_movie_id_sets.append({mp.external_movie_id for mp in movie_preferences if mp.preference_type == PreferenceTypes.positive})
            negative_movie_id_sets.append({mp.external_movie_id for mp in movie_preferences if mp.preference_type == PreferenceTypes.negative})

        positive_movie_ids = set.intersection(*positive_movie_id_sets) if positive_movie_id_sets else set()
        negative_movie_ids = set.union(*negative_movie_id_sets) if negative_movie_id_sets else set()
        recommended_movie_ids = list(positive_movie_ids.difference(negative_movie_ids))[:5] # Limit recommendations to 5
        movie_dicts = [get_movie(movie_id) for movie_id in recommended_movie_ids]

        return jsonify({'movies': movie_dicts})
