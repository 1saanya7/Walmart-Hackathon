from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from database import init_db
from events import register_socketio_events
from models import db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

CORS(app, supports_credentials=True)
init_db(app)
socketio = SocketIO(app, cors_allowed_origins="*")

register_socketio_events(socketio)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
