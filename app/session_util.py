from flask import session

def is_user_logged_in():
    return 'email' in session

def delete_session():
    session.clear()

def create_session(email):
    session['email'] = email
