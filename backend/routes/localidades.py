from flask import Blueprint
from controllers.localidad_controller import get_localidades, get_localidadId, post_localidad, put_localidad, patch_localidad, delete_localidad


# se crea un blueprint para organizar las rutas/endpoints relacionadas con localidades
localidades_bp = Blueprint('localidades', __name__, url_prefix='/localidades') # url_prefix es para que todas las rutas de este blueprint empiecen con /api, por ejemplo /api/localidades para obtener todos los localidades, /api/localidades/1 para obtener el localidad con id 1, etc. Esto ayuda a organizar mejor las rutas y a evitar conflictos con otras partes de la API que puedan tener rutas similares.


############# GET ################
# ruta para obtener todos los localidades
localidades_bp.route('/', methods=['GET'])(get_localidades)
# busca el localidad por su ID
localidades_bp.route('/<int:id>', methods=['GET'])(get_localidadId)

############# POST ################
localidades_bp.route('/', methods=['POST'])(post_localidad)
    
#################### PUT ################
localidades_bp.route('/<int:id>', methods=['PUT'])(put_localidad)
        
#################### PATCH ################
localidades_bp.route('/<int:id>', methods=['PATCH'])(patch_localidad)

#################### DELETE ################
localidades_bp.route('/<int:id>', methods=['DELETE'])(delete_localidad)

