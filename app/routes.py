from app import app
from app.controllers import HomeController

@app.route('/')
def home():
    return HomeController().handle()
