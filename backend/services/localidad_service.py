
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
    return Localidad.query.all()

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
    
    db.session.delete(localidad)
    db.session.commit()


