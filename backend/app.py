import os
from flask import request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO,emit

# App Initialization
from . import create_app, db # from __init__ file
app = create_app(os.getenv("CONFIG_MODE")) 
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

# Hello World!
@app.route('/')
def hello():
    db.create_all()
    return "Hello World!"

# Applications Routes
from .routes.accounts import urls
from .routes.items import urls

@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    print("okay")
    return jsonify(data)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print("ho")
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ",str(data))
    emit("data",{'data':data,'id':request.sid},broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

# ----------------------------------------------- #

if __name__ == "__main__":
    # To Run the Server in Terminal => flask run -h localhost -p 5000
    # To Run the Server with Automatic Restart When Changes Occurred => FLASK_DEBUG=1 flask run -h localhost -p 5000
    socketio.run(app, debug=True,port=5000)