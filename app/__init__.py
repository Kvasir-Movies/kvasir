import os
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import timedelta

app = Flask(__name__)
app.config.from_object(os.environ["APP_SETTINGS"])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

BUILD_DIR = os.path.join(os.path.dirname(app.root_path), "build")
app.static_folder = os.path.join(BUILD_DIR, "static")


from app import models
from app import routes


@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(days=7)


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "dsc": db.session.commit,
        "dsr": db.session.rollback,
        "User": models.User,
        "MoviePreference": models.MoviePreference,
    }


if __name__ == "__main__":
    app.run()
