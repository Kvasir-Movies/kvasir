from flask import session

from functools import wraps

from flask import session, redirect, url_for

def is_user_logged_in():
    return 'email' in session

def delete_session():
    session.clear()

def create_session(email):
    session['email'] = email

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not is_user_logged_in():
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function
