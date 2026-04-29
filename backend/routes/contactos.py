from flask import Blueprint
from controllers.contacto_controller import get_contactos, get_contactoId, post_contacto, put_contacto, patch_contacto, delete_contacto


# se crea un blueprint para organizar las rutas/endpoints relacionadas con contactos
contactos_bp = Blueprint('contactos', __name__, url_prefix='/contactos') # url_prefix es para que todas las rutas de este blueprint empiecen con /api, por ejemplo /api/contactos para obtener todos los contactos, /api/contactos/1 para obtener el contacto con id 1, etc. Esto ayuda a organizar mejor las rutas y a evitar conflictos con otras partes de la API que puedan tener rutas similares.


############# GET ################
# ruta para obtener todos los contactos
contactos_bp.route('/', methods=['GET'])(get_contactos)
# busca el contacto por su ID
contactos_bp.route('/<int:id>', methods=['GET'])(get_contactoId)

############# POST ################
contactos_bp.route('/', methods=['POST'])(post_contacto)
    
#################### PUT ################
contactos_bp.route('/<int:id>', methods=['PUT'])(put_contacto)
        
#################### PATCH ################
contactos_bp.route('/<int:id>', methods=['PATCH'])(patch_contacto)

#################### DELETE ################
contactos_bp.route('/<int:id>', methods=['DELETE'])(delete_contacto)

