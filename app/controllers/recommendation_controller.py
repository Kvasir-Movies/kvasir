from flask import jsonify, request

from app import db
from app.models import User
from app.util.tmdb_helpers import get_movie


class RecommendationController():
    def handle(self):
        emails = [email.strip() for email in request.args.get('emails').split(',')]
        users = User.query.filter(User.email.in_(emails))

        movie_id_sets = [{mp.external_movie_id for mp in user.movies} for user in users]
        common_movie_ids = set.intersection(*movie_id_sets) if movie_id_sets else set()
        recommended_movie_ids = list(common_movie_ids)[:5] # Limit recommendations to 5
        movie_dicts = [get_movie(movie_id) for movie_id in recommended_movie_ids]
        
        return jsonify({'movies': movie_dicts})