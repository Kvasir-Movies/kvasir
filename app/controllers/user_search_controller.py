from flask import jsonify, request

from app.models import User
from app.util.session_util import get_current_session_user

class UserSearchController():
    def handle(self):
        session_user = get_current_session_user()
        query = request.args.get('query', '')
        users = User.query.filter(User.email.ilike('%{}%'.format(query))).filter(User.id != session_user.id).limit(10).all()
        return jsonify({'users': [user.to_dict() for user in users]})