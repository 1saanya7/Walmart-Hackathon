from flask_socketio import emit
from models import db, User, Message, CartItem
from datetime import datetime
import uuid
from flask import request
# ✅ Move this helper function to the top so it's available
def get_cart_items(group_id):
    items = CartItem.query.filter_by(group_id=group_id).all()
    return [{
        'id': item.id,
        'name': item.product.name,
        'price': item.product.price,
        'image_url': item.product.image_url,
        'description': item.product.description,
        'added_by': item.added_by
    } for item in items]

def register_socketio_events(socketio):

    @socketio.on('connect')
    def handle_connect():
        print('User connected')

    @socketio.on('get_members')
    def get_members():
        users = User.query.all()
        member_list = [{
            'id': user.id,
            'name': user.name,
            'avatar': user.avatar,
            'isOnline': user.online,
            'joinedAt': user.joined_at.strftime("%I:%M %p")
        } for user in users]
        emit('update_members', member_list, broadcast=True)

    @socketio.on('get_messages')
    def get_messages():
        messages = Message.query.order_by(Message.timestamp).all()
        msg_list = [{
            'id': str(msg.id),
            'sender': msg.sender_name,
            'message': msg.content,
            'time': msg.timestamp.strftime("%I:%M %p"),
            'isAI': msg.is_ai
        } for msg in messages]
        emit('load_messages', msg_list)

    @socketio.on('send_message')
    def send_message(data):
        message = Message(
            sender_id='you',
            sender_name=data['sender'],
            content=data['message'],
            is_ai=data['isAI']
        )
        db.session.add(message)
        db.session.commit()
        emit('receive_message', {
            'id': str(message.id),
            'sender': message.sender_name,
            'message': message.content,
            'time': message.timestamp.strftime("%I:%M %p"),
            'isAI': message.is_ai
        }, broadcast=True)

    @socketio.on('generate_invite')
    def generate_invite():
        invite = f"http://localhost:5173/join/{uuid.uuid4()}"
        print(f"Generated invite link: {invite}")  # Optional: debug log
        emit('invite_link', invite, room=request.sid)  # Send only to the requesting user

    @socketio.on('add_to_cart')
    def handle_add_to_cart(data):
        group_id = data['group_id']
        product_id = data['product_id']
        added_by = data['added_by']

        item = CartItem(group_id=group_id, product_id=product_id, added_by=added_by)
        db.session.add(item)
        db.session.commit()

        # ✅ Correct usage of get_cart_items here
        updated_cart = get_cart_items(group_id)
        emit('cart_updated', updated_cart, broadcast=True)

    @socketio.on('get_cart')
    def handle_get_cart(data):
        group_id = data['group_id']
        updated_cart = get_cart_items(group_id)
        emit('cart_updated', updated_cart)
