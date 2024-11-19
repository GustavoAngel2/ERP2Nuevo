# Usa una imagen de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el proyecto Angular al contenedor
COPY . .

# Expone el puerto en el que el servidor de Angular estará escuchando
EXPOSE 7001

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
