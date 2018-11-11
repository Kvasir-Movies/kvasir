import os


class Config(object):
    ENV = None
    DEBUG = False
    OMDB_API_KEY = os.environ['OMDB_API_KEY']
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    TMDB_API_KEY = os.environ['TMDB_API_KEY']
    TESTING = False


class ProductionConfig(Config):
    ENV = 'production'


class StageConfig(Config):
    DEBUG = True
    ENV = 'stage'
    TESTING = True


class DevelopmentConfig(Config):
    DEBUG = True
    ENV = 'development'
    TESTING = True
