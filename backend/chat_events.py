# chat_events.py
from flask_socketio import emit, join_room
from datetime import datetime

messages = []
members = [
    {'id': '1', 'name': 'You', 'avatar': '👤', 'isOnline': True, 'joinedAt': '2 hours ago'},
    {'id': '2', 'name': 'Sarah Johnson', 'avatar': '👩‍💼', 'isOnline': True, 'joinedAt': '1 hour ago'},
    {'id': '3', 'name': 'Mike Chen', 'avatar': '👨‍💻', 'isOnline': False, 'joinedAt': '45 minutes ago'},
]

def register_chat_events(socketio):

    @socketio.on('connect')
    def on_connect():
        print('User connected')
        emit('get_members', members)
        emit('load_messages', messages)

    @socketio.on('send_message')
    def handle_send_message(data):
        print("Message received:", data)
        message = {
            'id': str(len(messages) + 1),
            'sender': data['sender'],
            'message': data['message'],
            'time': datetime.now().strftime('%I:%M %p'),
            'isAI': data.get('isAI', False)
        }
        messages.append(message)
        emit('receive_message', message, broadcast=True)

    @socketio.on('get_messages')
    def handle_get_messages():
        emit('load_messages', messages)

    @socketio.on('get_members')
    def handle_get_members():
        emit('update_members', members)
