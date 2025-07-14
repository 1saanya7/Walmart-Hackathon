from flask import Blueprint, jsonify

group_chat_bp = Blueprint('group_chat', __name__)

@group_chat_bp.route('/members', methods=['GET'])
def get_members():
    return jsonify([
        { "id": "1", "name": "You", "isOnline": True },
        { "id": "2", "name": "Sarah Johnson", "isOnline": True },
        { "id": "3", "name": "Mike Chen", "isOnline": False }
    ])
