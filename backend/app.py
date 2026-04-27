from flask import Flask
from models.contacto import db # importar tabla para que se conecte con la app
from routes.contactos import contactos_bp # importar el blueprint de rutas para contactos

app = Flask(__name__) # crear la app de Flask

# se llama a la BD y se usa sqlite, el archivo se va a llamar contactos.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contactos.db'

# se conecta la BD con la app
db.init_app(app)
app.register_blueprint(contactos_bp) # registrar el blueprint para que la app lo reconozca

# se le dice a la app que lo que se va a ejecutar dentro de ese bloque es algo que tiene que hacer la app, en este caso crear la BD 
with app.app_context():
    #from models.contacto import Contacto # importa el modelo/tabla para que lo reconozca
    db.create_all() # crea la BD con la tabla que se definio en el modelo

@app.route('/')
def inicio():
    return {"message": "API Contactos"}


# 
if __name__ == '__main__':
    # host='0.0.0.0' permite que funcione bien más adelante con Docker
    app.run(host='0.0.0.0', port=5000, debug=True)
