# Usar una versión oficial y ligera de Node.js
FROM node:18-alpine

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo las dependencias de producción de forma limpia
RUN npm ci --only=production

# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto en el que corre la app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]