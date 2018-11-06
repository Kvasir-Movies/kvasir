from flask import session, redirect, url_for

from app.models import User
from app.session_util import is_user_logged_in

class HomeController():
    def handle(self):
        if not is_user_logged_in():
            return redirect(url_for('login'))

        email = session['email']
        user = User.query.filter(User.email == email).one()
        return f"Hello, {user.email}!"