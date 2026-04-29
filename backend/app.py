from flask import Flask
from extensiones import db # importar tabla para que se conecte con la app
from routes.contactos import contactos_bp # importar el blueprint de rutas para contactos

# Inicializa flask
app = Flask(__name__) 

# Configurar bd con sqlite, el archivo se va a llamar contactos.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contactos.db'

# se conecta la BD con la app
# Registra blueprint de contactos
db.init_app(app)
app.register_blueprint(contactos_bp) 

# crea las tablas en la base de datos (en produccion))
# with app.app_context():
  #  db.create_all()
 

@app.route('/')
def inicio():
    return {"message": "API Contactos"}


# db create va dentro de este bloque solo en desarrollo
if __name__ == '__main__':
        with app.app_context():
            db.create_all()
        app.run(host='0.0.0.0', port=5000, debug=True)
