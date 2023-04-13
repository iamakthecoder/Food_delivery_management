from flask import Flask
from .models import addAdmins

#check for bitly





def create_app():
    app = Flask(__name__)
    # app.config["SECRET KEY"] = "a very long secret key"
    app.config['TEMPLATES_AUTO_RELOAD']=True
    app.config['SESSION_TYPE']="filesystem"
    app.secret_key = "a very long secret key"


    from .views import views
    from .auth import Auth

    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(Auth,url_prefix='/')

    addAdmins()
    
    return app