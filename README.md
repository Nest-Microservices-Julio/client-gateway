## Client Gateway
El gateway es el punto de comunicacion entre nuestros clientes y nuestros servicios.
Es el encargado de recibir las peticiones de los clientes y redirigirlas a los servicios correspondientes y de devolver las respuestas de los servicios a los clientes.

## Dev 

1. Clonar el repositorio
2. Instalar las dependencias
3. Crear un archivo `.env` basado en el archivo `.env.example`
4. Levantar el servicio de nats
```bash
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```
5. Teneer levantados los microservicios que se van a consumir
6. Levantar el protecto con `npm run start:dev`


## Nats
```bash
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```