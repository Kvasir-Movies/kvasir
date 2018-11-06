from flask import session

import time

expiry_window = 604800 # 7 days

def is_user_logged_in():
    expiryTime = session.get('sessionExpiryTimestamp', None)
    if expiryTime == None or is_session_expired():
        delete_session()
        return False
    return True

def delete_session():
    session.clear()

def is_session_expired():
    expiryTime = session.get('sessionExpiryTimestamp', None)
    if expiryTime == None:
        return false

    currentTime = get_timestamp()
    return currentTime > expiryTime

def create_session(email):
    session['email'] = email
    session['sessionExpiryTimestamp'] = get_timestamp() + expiry_window

def get_timestamp():
    return int(time.time())
