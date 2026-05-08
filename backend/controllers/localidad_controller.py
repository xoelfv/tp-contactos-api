# controllers encargado de recibir las solicitudes HTTP, validar los datos, llamar a los servicios correspondientes y devolver respuestas JSON estandarizadas

from flask import jsonify
from flask import request
from schemas.localidad import localidad_schema
from services.localidad_service import crear_localidad, obtener_localidades, obtener_localidadId, actualizar_localidad, modificar_localidad, eliminar_localidad


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

def get_localidades():
    localidades=obtener_localidades()
    if localidades is None:
        return respuesta_json(False, "Localidades no encontrados", "No existen localidades en la base de datos", 404)
    resultado = localidad_schema.dump(localidades, many=True)
    return respuesta_json(True, resultado, "Localidads obtenidos correctamente", 200)

def get_localidadId(id):
    localidad = obtener_localidadId(id)
    
    if localidad is None:
        return respuesta_json(False, "Localidad no encontrado", "No existe un localidad con el id proporcionado", 404)
    
    resultado = localidad_schema.dump(localidad)
    return respuesta_json(True, resultado, "Localidad encontrado", 200)

##### POST #####

def post_localidad():
    datos = request.get_json()
    errors = localidad_schema.validate(datos)
    if errors:
        return errors
    localidad = crear_localidad(datos)
    resultado = localidad_schema.dump(localidad)
    return respuesta_json(True, resultado, "Localidad creado correctamente", 201)

##### PUT #####

def put_localidad(id):
    
    localidad = obtener_localidadId(id)

    if localidad is None:
        return respuesta_json(False, "Localidad no encontrado", "No existe un localidad con el id proporcionado", 404)
    
    datos = request.get_json()
    errors = localidad_schema.validate(datos)
    if errors: 
        return errors 
    
    localidad_actualizado =actualizar_localidad(id, datos)
    resultado = localidad_schema.dump(localidad_actualizado)

    return respuesta_json(True, resultado, "Localidad actualizado correctamente", 200)
        
##### PATCH #####

def patch_localidad(id):

    localidad = obtener_localidadId(id)

    if localidad is None:
        return respuesta_json(False, "Localidad no encontrado", "No existe un localidad con el id proporcionado", 404)
    
    datos = request.get_json()
    errors = localidad_schema.validate(datos, partial=True) 
    if errors: 
        return errors 
    
    localidad_actualizado = modificar_localidad(id, datos)
    resultado = localidad_schema.dump(localidad_actualizado)

    return respuesta_json(True, resultado, "Localidad actualizado correctamente", 200)

##### DELETE #####

def delete_localidad(id):

    localidad_id = obtener_localidadId(id)

    if localidad_id is None:
        return respuesta_json(False, "Localidad no encontrado", "No existe un localidad con el id proporcionado", 404)
    
    try:
        eliminar_localidad(id)
    except Exception as e:
        return respuesta_json(False, "Error al eliminar localidad", "No se puede borrar una localidad asociada a un contacto", errors=str(e), code=500)
    
    return respuesta_json(True, "Localidad eliminado correctamente", 200)


