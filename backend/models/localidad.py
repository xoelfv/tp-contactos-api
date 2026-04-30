from extensiones import db

class Localidad(db.Model):
    __tablename__ = 'localidades'

    id = db.Column (db.Integer, primary_key=True, nullable=False)
    nombre = db.Column (db.String(50), nullable=False)
    
    

