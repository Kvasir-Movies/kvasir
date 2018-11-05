from app import db
from app.password_util import hash_password

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(64), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password_hash = hash_password(password)

    def __repr__(self):
        return '<User {}: {}>'.format(self.id, self.email)
