# serializacion marshmallow, convertir objetos de python a json y viceversa para enviar y recibir datos mediante la API

from marshmallow import Schema, fields

class ContactoSchema(Schema):
    id = fields.Int(dump_only=True) # dump_only significa que nosotros no lo enviamos, se genera solo
    nombre = fields.Str(required=True)
    apellido = fields.Str(required=True)
    direccion = fields.Str()
    email = fields.Email(required=True) # valida que tenga formato de correo electrónico
    telefono = fields.Str()

# se crean instancias de los esquemas para usarlas después en las rutas
contacto_schema = ContactoSchema()
# contactos_schema = ContactoSchema(many=True) # many=True es para traducir listas de muchos contactos
# no es necesario crear esta instancia porque en las rutas se puede usar contacto_schema.dump(contactos, many=True) 
# para traducir listas de contactos sin necesidad de crear un nuevo esquema solo para eso