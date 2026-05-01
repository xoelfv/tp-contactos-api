
# services encargado de manipular db y devolver objetos de python a las rutas para que se conviertan a json con marshmallow

from models.localidad import Localidad
from extensiones import db


###### POST #####

def crear_localidad(datos):
    nueva_localidad = Localidad(**datos)
    
    db.session.add(nueva_localidad)
    db.session.commit()
    return nueva_localidad

###### GET #####

def obtener_localidades():
    localidad=Localidad.query.all()
    if not localidad:
        return None
    return localidad

def obtener_localidadId(id):
    localidad = Localidad.query.get(id)

    if localidad is None:
        return None

    return localidad

###### PUT #####

def actualizar_localidad(id, datos):

    localidad = Localidad.query.get(id)

    if localidad is None:
        return None
    
    for key, value in datos.items():
        setattr(localidad, key, value)
    db.session.commit()
    
    return localidad

###### PATCH #####
def modificar_localidad(id, datos):

    localidad = Localidad.query.get(id)

    if localidad is None:
        return None
    
    for key, value in datos.items():
        setattr(localidad, key, value)
    db.session.commit()
    
    return localidad

###### DELETE #####

def eliminar_localidad(id):

    localidad = Localidad.query.get(id)

    if localidad is None:
        return None
    try:
        db.session.delete(localidad)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e
    

