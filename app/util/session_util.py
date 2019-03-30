from functools import wraps

from flask import abort, session, redirect, url_for

from ..models import User


def is_user_logged_in():
    return 'email' in session


def delete_session():
    session.clear()


def create_session(email):
    session['email'] = email


def get_current_session_user():
    return User.query.filter(User.email == session['email']).one_or_none()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not is_user_logged_in():
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


def abort_if_not_current_user(f):
    @wraps(f)
    def decorated_function(user_id, *args, **kwargs):
        user = get_current_session_user()
        if user is not User.query.get(user_id):
            abort(403)
        return f(user, *args, **kwargs)
    return decorated_function
