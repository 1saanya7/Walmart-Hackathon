from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String, default='👤')
    online = db.Column(db.Boolean, default=True)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.String, db.ForeignKey('user.id'))
    sender_name = db.Column(db.String)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    is_ai = db.Column(db.Boolean, default=False)

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, default=1)
    added_by = db.Column(db.String, db.ForeignKey('user.id'))


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    price = db.Column(db.Float)
    image_url = db.Column(db.String(300))
    description = db.Column(db.String(500))

class CartItem(db.Model):
    __tablename__ = 'cart_item'
    __table_args__ = {'extend_existing': True}  # <- This solves the issue

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.String, nullable=False)
    product_id = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String, nullable=True)
    added_by = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
