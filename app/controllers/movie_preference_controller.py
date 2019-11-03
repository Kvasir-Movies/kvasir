from flask import abort, jsonify, request

from app import db
from app.models import MoviePreference, PreferenceTypes

class MoviePreferenceController():
    def create(self, user):
        data = request.get_json()
        external_movie_id = data.get('externalMovieId', None)
        preference_type = data.get('preferenceType', PreferenceTypes.positive)
        if not external_movie_id:
            abort(400)

        mp = MoviePreference(user, external_movie_id, preference_type)
        db.session.commit()

        return jsonify(mp.to_dict())

    def upsert(self, user):
        data = request.get_json()
        external_movie_id = data.get('externalMovieId', None)
        preference_type = data.get('preferenceType', PreferenceTypes.positive)
        if not external_movie_id:
            abort(400)

        print(data)
        print(external_movie_id)

        mp = MoviePreference.query.filter_by(
            user=user, external_movie_id=external_movie_id).one_or_none()
        if mp:
            mp.preference_type = preference_type
        else:
            mp = MoviePreference(user, external_movie_id, preference_type)

        db.session.commit()

        return jsonify(mp.to_dict())
