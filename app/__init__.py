import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import models
from app import routes

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'dsc': db.session.commit,
        'dsr': db.session.rollback,
        'User': models.User,
        'MoviePreference': models.MoviePreference,
    }

if __name__ == '__main__':
    app.run()