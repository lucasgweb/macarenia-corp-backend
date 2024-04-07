## Iniciar el Proyecto con Docker y Prisma Migrations

### Docker Compose Up

Para iniciar los servicios necesarios, incluyendo la base de datos, ejecuta:

```bash
docker-compose up
```

### Ejecutar Migraciones de Prisma

Con los servicios de Docker en ejecución, aplica las migraciones de Prisma para actualizar tu esquema de base de datos:

```bash
npx prisma migrate dev
```
