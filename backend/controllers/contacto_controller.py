from flask import jsonify
from flask import request
from models.localidad import Localidad
from schemas.contacto import contacto_schema
from services.contacto_service import crear_contacto, obtener_contactos, obtener_contactoId, actualizar_contacto, modificar_contacto, eliminar_contacto


# función para estandarizar las respuestas JSON de la API
def respuesta_json(success, data=None, message="", errors=None, code=200):
    respuesta = {
        "success": success,
        "data": data,
        "message": message,
        "errors": errors
    }
    return jsonify(respuesta), code

##### GET #####

def get_contactos():
    contactos=obtener_contactos()
    resultado = contacto_schema.dump(contactos, many=True)
    return respuesta_json(True, resultado, "Contactos obtenidos correctamente", None, 200)

def get_contactoId(id):
    contacto = obtener_contactoId(id)
    
    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", {f"No existe un contacto con id {id}"}, 404)
    
    resultado = contacto_schema.dump(contacto)
    return respuesta_json(True, resultado, "Contacto encontrado", 200)

##### POST #####

def post_contacto():
    datos = request.get_json()
    errors = contacto_schema.validate(datos)
    if errors:
        return errors
    contacto = crear_contacto(datos)
    resultado = contacto_schema.dump(contacto)
    return respuesta_json(True, resultado, "Contacto creado correctamente", 201)

##### PUT #####

def put_contacto(id):
    
    contacto = obtener_contactoId(id)

    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", {f"No existe un contacto con id {id}"}, 404)
    
    datos = request.get_json()
    errors = contacto_schema.validate(datos)
    if errors: 
        return errors 
    
    contacto_actualizado =actualizar_contacto(id, datos)
    resultado = contacto_schema.dump(contacto_actualizado)

    return respuesta_json(True, resultado, "Contacto actualizado correctamente", 200)
        
##### PATCH #####

def patch_contacto(id):

    contacto = obtener_contactoId(id)

    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", {f"No existe un contacto con id {id}"}, 404)
    
    datos = request.get_json()
    errors = contacto_schema.validate(datos, partial=True) 
    if errors: 
        return errors 
    if 'id_localidad' in datos:
        if Localidad.query.get(datos['id_localidad']) is None:
             return respuesta_json(False, "Localidad no encontrado", "No existe una localidad con la id proporcionada", 404)
    
    contacto_actualizado = modificar_contacto(id, datos)
    resultado = contacto_schema.dump(contacto_actualizado)

    return respuesta_json(True, resultado, "Contacto actualizado correctamente", 200)

##### DELETE #####

def delete_contacto(id):

    contacto = eliminar_contacto(id)

    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", {f"No existe un contacto con id {id}"}, 404)
    
    return respuesta_json(True, "Contacto eliminado correctamente", 200)


