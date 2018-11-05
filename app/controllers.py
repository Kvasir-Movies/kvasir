from app.models import User

class HomeController():
    def handle(self):
        user = User.query.first()
        if user:
            return f"Hello, {user.email}!"
        else:
            return "No users. Sad!"
