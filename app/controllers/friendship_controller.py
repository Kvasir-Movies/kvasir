from flask import abort, jsonify, request

from app import db
from app.models import Friendship, User

class FriendshipController():
    def create(self, user):
        data = request.get_json()
        friend_email = data.get('friendEmail', None)
        if not friend_email:
            abort(400)
        friend = User.query.filter_by(email=friend_email).one_or_none()
        if not friend:
            abort(400)

        Friendship(user, friend)
        Friendship(friend, user)

        db.session.commit()

        return jsonify(user.to_dict())
