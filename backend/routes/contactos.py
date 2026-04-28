from flask import Blueprint, jsonify
from flask import request 
from models.contacto import db, Contacto

# se importa la tabla/modelo para poder hacer consultas a la base de datos 
# y el esquema de marshmallow para serializar los datos
from models.contacto import Contacto
from schemas.contacto import contactos_schema
from schemas.contacto import contacto_schema

# se crea un blueprint para organizar las rutas/endpoints relacionadas con contactos
contactos_bp = Blueprint('contactos', __name__)

############# GET ################

# ruta para obtener todos los contactos
@contactos_bp.route('/contactos', methods=['GET'])
def obtener_contactos():
    # busca todos los contactos en la base de datos, equivalente a SELECT * FROM contactos en SQL
    contactos = Contacto.query.all()
    
    # se traduce los objetos de python a datos en bruto usando el esquema de marshmallow
    resultado = contactos_schema.dump(contactos)
    
    # diccionario respuesta json con codigo de estado 200 (OK)
    return jsonify({
        "success": True,
        "data": resultado,
        "count": len(resultado),
        "message": "Contactos obtenidos correctamente"
    }), 200

# busca el contacto por su ID
@contactos_bp.route('/contactos/<int:id>', methods=['GET'])
def obtener_contactoId(id):
    
    contacto = Contacto.query.get(id)
    
    if contacto is None:
        return jsonify({
            "success": False,
            "message": "Contacto no encontrado",
            "errors": [f"No existe un contacto con el ID {id}"] # f en corchetes (no usar llaves) para formatear el mensaje con el ID
        }), 404

    # si existe, traduce (schema individual)
    resultado = contacto_schema.dump(contacto)
    
    # respuesta json diccionario
    return jsonify({
        "success": True,
        "data": [resultado], 
        "count": 1,
        "message": "Contacto encontrado"
    }), 200

############# POST ################

@contactos_bp.route('/contactos', methods=['POST'])
def crear_contacto():
    # recibir datos json externos
    datos = request.get_json()
    
    # validar, guardar en base de datos y convertir los datos con marshmallow
    errors = contacto_schema.validate(datos)
    if errors:
        return jsonify({
            "success": False,
            "message": "Error de validación",
            "errors": errors
        }), 400
    else: 
        nuevo_contacto = Contacto(
            nombre=datos['nombre'],
            apellido=datos['apellido'],
            direccion=datos.get('direccion'),  
            email=datos['email'],
            telefono=datos['telefono']
        )
        # creación en la base de datos
        db.session.add(nuevo_contacto)
        db.session.commit()
        resultado = contacto_schema.dump(nuevo_contacto)
        return jsonify({
            "success": True,
            "data": [resultado],
            "count": 1,
            "message": "Contacto creado correctamente"
        }), 201
    
#################### PUT ################

@contactos_bp.route('/contactos/<int:id>', methods=['PUT'])
def actualizar_contacto(id):
    
    contacto = Contacto.query.get(id)

    if contacto is None:
        return jsonify({
            "success": False,
            "message": "Contacto no encontrado",
            "errors": [f"No existe un contacto con ID {id}"]
        }), 404
    else:
        datos = request.get_json()

        errors = contacto_schema.validate(datos)
        if errors:
            return jsonify({
                "succecss": False,
                "message": "Error de validación",
                "errors": errors
            }), 400
        else:
            contacto.nombre = datos ['nombre']
            contacto.apellido = datos ['apellido']
            contacto.direccion = datos ['direccion']
            contacto.telefono = datos ['telefono']
            contacto.email = datos ['email']

            db.session.commit()
            resultado = contacto_schema.dump(contacto)

            return jsonify({
                "success": True,
                "data": [resultado],
                "count": 1,
                "message": "Contacto actualizado correctamente"
            }), 200
        
#################### DELETE ################

@contactos_bp.route('/contactos/<int:id>', methods=['DELETE'])
def eliminar_contacto(id):

    contacto = Contacto.query.get(id)

    if contacto is None:
        return jsonify({
            "success": False,
            "message": "Contacto no encontrado",
            "errors": [f"No existe un contacto con ID {id}"]
        }), 404
    else: 
        db.session.delete(contacto)
        db.session.commit()
        return jsonify({
            "success": True,
            "message": "Contacto eliminado correctamente"
        }), 200



