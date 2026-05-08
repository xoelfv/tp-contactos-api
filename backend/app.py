from flask import Flask
from extensiones import db # importar tabla para que se conecte con la app
from routes.contactos import contactos_bp # importar el blueprint de rutas para contactos
from routes.localidades import localidades_bp # importar el blueprint de rutas para localidades
from sqlalchemy import event
from sqlalchemy.engine import Engine
from flask_cors import CORS


# Inicializa flask
app = Flask(__name__) 
CORS(app)
# Configurar bd con sqlite y crear db api.db en instances. De modificar una tabla, eliminar el archivo api.db
#  para que se vuelva a crear con la nueva estructura
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///api.db'
    

# listener que se ejecuta cada vez que se establece una conexión con la base de datos, y ejecuta el comando 
# PRAGMA foreign_keys=ON para habilitar el uso de claves foraneas en sqlite.
# Esto es necesario porque sqlite no habilita el uso de claves foraneas por defecto y lo restaura cada vez que se conecta.
# Esto impide eliminar localidades que tienen contactos asociados
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

# se conecta la BD con la app
db.init_app(app)

# Registra blueprint de contactos y localidades para poder usar sus rutas en la app
app.register_blueprint(contactos_bp) 
app.register_blueprint(localidades_bp)


@app.route('/')
def inicio():
    return {"message": "API Contactos"}



if __name__ == '__main__':
        with app.app_context():
            db.create_all()
        app.run(host='0.0.0.0', port=5000, debug=True)
