import os

class Config(object):
    ENV = None
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
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
    SECRET_KEY = 'default_secret'
