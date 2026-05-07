# controllers encargado de recibir las solicitudes HTTP, validar los datos, llamar a los servicios correspondientes y devolver respuestas JSON estandarizadas



from flask import jsonify
from flask import request
from marshmallow import ValidationError
from models.localidad import Localidad
from schemas.contacto import contacto_schema
from services.contacto_service import crear_contacto, eliminar_contactos, obtener_contactos, obtener_contactoId, actualizar_contacto, modificar_contacto, eliminar_contacto


# función para estandarizar las respuestas JSON de la API
def respuesta_json(ok, data=None, message="", errors=None, code=200):
    respuesta = {
        "ok": ok,
        "data": data,
        "message": message,
        "errors": errors
    }
    return jsonify(respuesta), code

##### GET #####

def get_contactos():
    
    contactos=obtener_contactos()
    if contactos is None:
        return respuesta_json(False, "Contactos no encontrados", "No existen contactos en la base de datos", 404)   
    resultado = contacto_schema.dump(contactos, many=True)

    
    return respuesta_json(True, resultado, "Contactos obtenidos correctamente", None, 200)

def get_contactoId(id):
    contacto = obtener_contactoId(id)
    
    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", "No existe un contacto con el id proporcionado", 404)
    
    resultado = contacto_schema.dump(contacto)
    return respuesta_json(True, resultado, "Contacto encontrado", None, 200)

##### POST #####

def post_contacto():
    datos = request.get_json()
    try:
        datos = contacto_schema.load(datos)        
    except ValidationError as err:
        return respuesta_json(False, "Contacto no cargado", err.messages, 409)       
    contacto = crear_contacto(datos)
        

    resultado = contacto_schema.dump(contacto)
    
    return respuesta_json(True, resultado, "Contacto creado correctamente", None, 200)

##### PUT #####

def put_contacto(id):
    
    contacto = obtener_contactoId(id)

    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", "No existe un contacto con el id proporcionado", 404)
    
    datos = request.get_json()
    try:
        datos = contacto_schema.load(datos)
    except ValidationError as err:
        return respuesta_json(False, "Contacto no actualizado", err.messages, 409)
    contacto_actualizado =actualizar_contacto(id, datos)

    resultado = contacto_schema.dump(contacto_actualizado)

    return respuesta_json(True, resultado, "Contacto actualizado correctamente", None, 200)
        
##### PATCH #####

def patch_contacto(id):

    contacto = obtener_contactoId(id)

    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", "No existe un contacto con el id proporiconado", 404)
    
    datos = request.get_json()
    try:
        datos = contacto_schema.load(datos)
    except ValidationError as err:
        return respuesta_json(False, "Contacto no modificado", err.messages, 409)
    
    if 'id_localidad' in datos:
        if Localidad.query.get(datos['id_localidad']) is None:
             return respuesta_json(False, "Localidad no encontrado", "No existe una localidad con la id proporcionada", 404)
    contacto_actualizado = modificar_contacto(id, datos)
   
    resultado = contacto_schema.dump(contacto_actualizado)

    return respuesta_json(True, resultado, "Contacto actualizado correctamente", None, 200)

##### DELETE #####

def delete_contacto(id):

    contacto = obtener_contactoId(id)

    if contacto is None:
        return respuesta_json(False, "Contacto no encontrado", "No existe un contacto con el id proporcionado", 404)

    eliminar_contacto(id)    

    return respuesta_json(True, "Contacto eliminado correctamente", None, 200)

def delete_contactos():
    contactos = obtener_contactos()

    if contactos is None:
        return respuesta_json(False, "Contactos no encontrados", "No existen contactos en la base de datos", 404)

    eliminar_contactos()    

    return respuesta_json(True, "Contactos eliminados correctamente", None, 200)
