# serializacion marshmallow, convertir objetos de python a json y viceversa para enviar y recibir datos mediante la API

from marshmallow import Schema, fields, validate, pre_load

class LocalidadSchema(Schema):
    id = fields.Int(dump_only=True) # dump_only significa que nosotros no lo enviamos, se genera solo
    localidad = fields.Str(required=True, validate=validate.Regexp(r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$"))
    provincia = fields.Str(required=True, validate=validate.Regexp(r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$"))

    @pre_load()
    def normalizar_mayusculas(self, data, **kwargs):

        campos = [
        "localidad",
        "provincia"
        ]

        for campo in campos:
            if campo in data and data[campo]:
                data[campo] = data[campo].upper()
        return data
    
# se crean instancias de los esquemas para usarlas después en las rutas
localidad_schema = LocalidadSchema() 
# contactos_schema = ContactoSchema(many=True) # many=True es para traducir listas de muchos contactos
# no es necesario crear esta instancia porque en las rutas se puede usar contacto_schema.dump(contactos, many=True) 
# para traducir listas de contactos sin necesidad de crear un nuevo esquema solo para eso