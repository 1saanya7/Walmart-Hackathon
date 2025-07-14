from .group_chat_routes import group_chat_bp

def register_routes(app):
    app.register_blueprint(group_chat_bp, url_prefix='/api/group')
