from app.util.session_util import delete_session


class LogoutController:
    def handle(self):
        delete_session()
        return ""
