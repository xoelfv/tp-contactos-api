# services encargado de manipular db y devolver objetos de python a los controladores para validar y convertir a json con marshmallow

#importado integrityerror para devolver error tras validar unicidad de email IMPORTAR EXCEPCIONES SOLO DE SQLALCHEMY, NO DE SQLITE
from sqlalchemy.exc import IntegrityError

from models.localidad import Localidad
from models.contacto import Contacto
from extensiones import db


###### POST #####


def crear_contacto(datos):
    nuevo_contacto = Contacto(**datos)
    try:
        db.session.add(nuevo_contacto)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
       
    
    return nuevo_contacto

###### GET #####

def obtener_contactos():
    contacto = Contacto.query.all()

    if not contacto:
        return None
    return contacto


def obtener_contactoId(id):
    contacto = Contacto.query.get(id)
    if contacto is None:
        return None
    
    return contacto

###### PUT #####

def actualizar_contacto(id, datos):
    contacto = Contacto.query.get(id)
    if contacto is None:
        return None    
    
    try:
        for key, value in datos.items():
            setattr(contacto, key, value)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()


    return contacto

###### PATCH #####
def modificar_contacto(id, datos):
    contacto = Contacto.query.get(id)

    if contacto is None:
        return None
    try:
        for key, value in datos.items():
            if key == 'id_localidad':
                if Localidad.query.get(datos['id_localidad']) is not None:
                    setattr(contacto, key, value)
                else:
                    return None
            else:
                setattr(contacto, key, value)
    except IntegrityError:
        db.session.rollback()


    db.session.commit()
    return contacto

###### DELETE #####

def eliminar_contacto(id):

    contacto = Contacto.query.get(id)

    if contacto is None:
        return None
    
    db.session.delete(contacto)
    db.session.commit()

def eliminar_contactos():
    contacto = Contacto.query.all()
    
    if not contacto:
        return None

    for contacto in contacto:
        db.session.delete(contacto)
    db.session.commit()
    


