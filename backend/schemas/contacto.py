# serializacion marshmallow, convertir objetos de python a json y viceversa para enviar y recibir datos mediante la API
# se importa validate para validar con Regex directamente desde el schema sin tener que pasar por controllers
# se importa contacto, validationerror y validates para validar unicidad de email
# se importa pre_load para convertir datos a mayusculas antes de serializarlos
from marshmallow import Schema, ValidationError, fields, validate, validates, pre_load
from schemas.localidad import LocalidadSchema
from models.contacto import Contacto
class ContactoSchema(Schema):
    id = fields.Int(dump_only=True) # dump_only significa que nosotros no lo enviamos, se genera solo
    nombre = fields.Str(required=True, validate=validate.Regexp(r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$"))
    apellido = fields.Str(required=True, validate=validate.Regexp(r"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$"))
    direccion = fields.Str(validate=validate.Regexp(r"^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s\.,#\-]{3,50}$"))
    email = fields.Email(required=True, validate=validate.Regexp(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")) 
    telefono = fields.Str(validate=validate.Regexp(r"^\+?[0-9\s\-]{7,20}$"))
    id_localidad = fields.Int(required=False) 
    localidad = fields.Nested(LocalidadSchema, dump_only=True) # para incluir la localidad completa en la respuesta, no solo el id_localidad

    @pre_load()
    def normalizar_mayusculas(self, data, **kwargs):

        campos = [
        "nombre",
        "apellido",
        "direccion"
        ]

        for campo in campos:
            if campo in data and data[campo]:
                data[campo] = data[campo].upper()
        return data
    
        # valida unicidad de email
    @validates("email")
    def validar_unicidad_email (self, value):
        contacto = Contacto.query.filter_by(email=value).first()

        id_actual = self.context.get("id_contacto")

        if contacto:

            if id_actual is None:
                raise ValidationError(
                    "El email ya existe"
                )

            if contacto.id != int(id_actual):
                raise ValidationError(
                    "El email ya existe"
                )

# se crea instancia del esquema para usarla después en las rutas
contacto_schema = ContactoSchema()
