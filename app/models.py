from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<User {}: {}>'.format(self.id, self.email)
