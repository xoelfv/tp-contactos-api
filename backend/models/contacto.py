from extensiones import db

# inicializar la herramienta de la BD, despues se va a conectar con la app en app.py

class Contacto(db.Model):
    __tablename__ = 'contactos'

    id = db.Column (db.Integer, primary_key=True, nullable=False)
    nombre = db.Column (db.String(50), nullable=False)
    apellido = db.Column (db.String(50), nullable=False)
    direccion = db.Column (db.String(50))
    email = db.Column (db.String(50), nullable=False)
    telefono = db.Column (db.String(20), nullable=False)
    id_localidad = db.Column (db.Integer, db.ForeignKey('localidades.id', ondelete='RESTRICT'), nullable=False)
    
    localidad = db.relationship(
        'Localidad',
        back_populates='contactos'
    )
