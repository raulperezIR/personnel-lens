# Docker Deployment Guide

## Requisitos Previos

- Docker instalado en tu máquina local
- Docker Compose (opcional pero recomendado)

## Despliegue con Docker

### Opción 1: Usando Docker directamente

1. Construir la imagen:
```bash
docker build -t personnel-lens .
```

2. Ejecutar el contenedor:
```bash
docker run -d -p 8080:80 --name personnel-lens-app personnel-lens
```

3. Acceder a la aplicación:
Abre tu navegador y ve a: http://localhost:8080

### Opción 2: Usando Docker Compose (Recomendado)

1. Ejecutar con Docker Compose:
```bash
docker compose up -d
```

2. Acceder a la aplicación:
Abre tu navegador y ve a: http://localhost:8080

3. Para detener la aplicación:
```bash
docker compose down
```

## Comandos Útiles

### Ver logs del contenedor:
```bash
docker logs personnel-lens-app
```

### Detener el contenedor:
```bash
docker stop personnel-lens-app
```

### Eliminar el contenedor:
```bash
docker rm personnel-lens-app
```

### Reconstruir la imagen después de cambios:
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

## Configuración Avanzada

Si necesitas personalizar la configuración de nginx, puedes:

1. Crear un archivo `nginx.conf` personalizado
2. Descomentar la línea correspondiente en el Dockerfile:
   ```dockerfile
   COPY nginx.conf /etc/nginx/nginx.conf
   ```
3. Reconstruir la imagen

## Solución de Problemas

- Si el puerto 8080 está ocupado, puedes cambiarlo en el `docker-compose.yml` o en el comando `docker run`
- Para limpiar imágenes y contenedores: `docker system prune -f`
- Para ver el estado de los contenedores: `docker ps -a`