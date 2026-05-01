# controllers encargado de recibir las solicitudes HTTP, validar los datos, llamar a los servicios correspondientes y devolver respuestas JSON estandarizadas

from flask import jsonify
from flask import request
from schemas.localidad import localidad_schema
from services.localidad_service import crear_localidad, obtener_localidades, obtener_localidadId, actualizar_localidad, modificar_localidad, eliminar_localidad


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

def get_localidades():
    localidades=obtener_localidades()
    if localidades is None:
        return respuesta_json(success=False, message="Localidades no encontrados", errors="No existen localidades en la base de datos", code=404)
    resultado = localidad_schema.dump(localidades, many=True)
    return respuesta_json(success=True, data=resultado, message="Localidads obtenidos correctamente", code=200)

def get_localidadId(id):
    localidad = obtener_localidadId(id)
    
    if localidad is None:
        return respuesta_json(success=False, message="Localidad no encontrado", errors="No existe un localidad con el id proporcionado", code=404)
    
    resultado = localidad_schema.dump(localidad)
    return respuesta_json(success=True, data=resultado, message="Localidad encontrado", code=200)

##### POST #####

def post_localidad():
    datos = request.get_json()
    errors = localidad_schema.validate(datos)
    if errors:
        return errors
    localidad = crear_localidad(datos)
    resultado = localidad_schema.dump(localidad)
    return respuesta_json(success=True, data=resultado, message="Localidad creado correctamente", code=201)

##### PUT #####

def put_localidad(id):
    
    localidad = obtener_localidadId(id)

    if localidad is None:
        return respuesta_json(success=False, message="Localidad no encontrado", errors="No existe un localidad con el id proporcionado", code=404)
    
    datos = request.get_json()
    errors = localidad_schema.validate(datos)
    if errors: 
        return errors 
    
    localidad_actualizado =actualizar_localidad(id, datos)
    resultado = localidad_schema.dump(localidad_actualizado)

    return respuesta_json(success=True, data=resultado, message="Localidad actualizado correctamente", code=200)
        
##### PATCH #####

def patch_localidad(id):

    localidad = obtener_localidadId(id)

    if localidad is None:
        return respuesta_json(success=False, message="Localidad no encontrado", errors="No existe un localidad con el id proporcionado", code=404)
    
    datos = request.get_json()
    errors = localidad_schema.validate(datos, partial=True) 
    if errors: 
        return errors 
    
    localidad_actualizado = modificar_localidad(id, datos)
    resultado = localidad_schema.dump(localidad_actualizado)

    return respuesta_json(success=True, data=resultado, message="Localidad actualizado correctamente", code=200)

##### DELETE #####

def delete_localidad(id):

    localidad_id = obtener_localidadId(id)

    if localidad_id is None:
        return respuesta_json(success=False, message="Localidad no encontrado", errors="No existe un localidad con el id proporcionado", code=404)
    
    try:
        eliminar_localidad(id)
    except Exception as e:
        return respuesta_json(success=False, message="Error al eliminar localidad", errors=str(e), code=500)
    
    return respuesta_json(success=True, message="Localidad eliminado correctamente", code=200)


