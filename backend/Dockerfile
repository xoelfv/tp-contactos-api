# version ligera de Python
FROM python:3.10-slim

# crea carpeta de trabajo adentro del contenedor
WORKDIR /app

# copia requirements e instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copiar resto de los archivos (por ahora app.py)
COPY . .

# exponer el puerto 5000 para poder entrar desde navegador
EXPOSE 5000

# comando que enciende el servidor (el mismo que uso en la terminal localmente)
CMD ["python", "app.py"]