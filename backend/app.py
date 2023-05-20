import os

# App Initialization
from . import create_app, db # from __init__ file
app = create_app(os.getenv("CONFIG_MODE")) 

# Hello World!
@app.route('/')
def hello():
    db.create_all()
    return "Hello World!"

# Applications Routes
from .routes.accounts import urls
from .routes.resumes import urls

# ----------------------------------------------- #

if __name__ == "__main__":
    # To Run the Server in Terminal => flask run -h localhost -p 5000
    # To Run the Server with Automatic Restart When Changes Occurred => FLASK_DEBUG=1 flask run -h localhost -p 5000
    app.run()