from extensiones import db

class Localidad(db.Model):
    __tablename__ = 'localidades'

    id = db.Column (db.Integer, primary_key=True, nullable=False)
    nombre = db.Column (db.String(50), nullable=False)
    
    # relación con Contacto, un localidad puede tener muchos contactos, pero un contacto solo puede tener un localidad (relación uno a muchos
    contactos = db.relationship(
        'Contacto', 
        back_populates='localidad'
    )
    

