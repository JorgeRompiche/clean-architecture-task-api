# Clean Architecture Task API

Backend REST API construida con **Node.js + TypeScript + Express**, aplicando principios de **Clean Architecture** y **Domain-Driven Design (DDD)**.


---

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- TypeORM
- Zod (validación)
- JWT (preparado para integración)
- Jest (Unit Testing)
- Supertest (Integration Testing)
- Docker
- Docker Compose
- UUID
- Clean Architecture
- Domain-Driven Design (DDD)

---

## Arquitectura

El proyecto sigue principios de Clean Architecture, separando responsabilidades en capas independientes:

```
src/
├── domain/         -> Entidades y reglas de negocio
│ ├── entities/
│ │ └── __tests__/
│ ├── errors/
│ └── repositories/
│
├── application/    -> Casos de uso
│ ├── dtos/
│ └── use-cases/
│   └── __tests__/
│
├── infrastructure/ -> Implementaciones técnicas
│   ├── database/
│   │   └── typeorm/
│   │       ├── entities/
│   │       ├── migrations/
│   │       └── data-source.ts
│   └── repositories/
│
├── presentation/   -> Controllers y capa HTTP
│ ├── __tests__/
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
│ └── validators/
│
└── main/           -> Bootstrap de la aplicación
```
---

## Principios aplicados

- El dominio no depende de frameworks
- Casos de uso desacoplados de infraestructura
- Inversión de dependencias
- Encapsulamiento del modelo
- Separación clara entre modelo interno y contrato HTTP
- Diseño orientado a testabilidad
- Validación desacoplada del dominio
- Persistencia intercambiable
- Migraciones versionadas
- Preparado para CI/CD

---

## Persistencia

Se utiliza:

- PostgreSQL como base de datos
- TypeORM como ORM
- Migraciones versionadas

### Migraciones

En desarrollo:

```bash
docker compose up -d task-postgres
npm run migration:generate
npm run migration:run
```

Las migraciones:

- Son rchivos versionados
- Permiten rollback
- Requeridas en entornos productivos
- Evitan el uso de `sychronize: true`

---

## Funcionalidades Implementadas

### Crear Task
- Validación de reglas de negocio
- Generación automática de UUID
- Estado inicial `PENDING`
- Unit tests del dominio
- Integration test del endpoint

### Iniciar Task
- Transición válida: `PENDING` -> `IN_PROGRESS`
- Prevención de transiciones inválidas
- Tests unitarios

---

## Testing

### Unit Tests (Jest)

Se testea:

- Creación válida de entidad
- Reglas de negocio
- Transiciones de estado
- Errores esperados
- Casos de uso desacoplados

Ejecutar:

```bash
npm test
```

### Integration Tests (Supertest)

Se testea:

- Endpoints HTTP reales
- Códigos de estado correctos
- Formato de respuesta
- Contrato API estable

---

## Endpoints

### Crear Task

```
POST /tasks
```

Body:

```json
{
  "title": "My task",
  "description": "Task description",
  "projectId": "project-1"
}
```

Response:

```json
{
  "id": "uuid",
  "title": "My task",
  "description": "Task description",
  "projectId": "project-1",
  "status": "PENDING",
  "createdAt": "2026-02-26T21:21:39.380Z"
}
```

### Iniciar Task

```
PATCH /tasks/:id/start
```

Response:

```json
{
  "id": "uuid",
  "title": "My task",
  "description": "Task description",
  "projectId": "project-1",
  "status": "IN_PROGRESS",
  "createdAt": "2026-02-26T21:21:39.380Z"
}
```

---

## Middleware

- Manejo global de errores
- Logging estructurado
- Validación genérica de `body`, `params` y `query`
- Normalización de errores de dominio

---

## Docker

Levantar entorno completo:

```bash
docker compose up -d
```

Detener y eliminar volumen:

```bash
docker compose down -v
```

---

## Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/main/server.ts",
  "build": "tsc",
  "start": "node dist/main/server.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "typeorm": "typeorm-ts-node-commonjs",
  "migration:generate": "npm run typeorm -- migration:generate src/infrastructure/database/typeorm/migrations/Init -d src/infrastructure/database/typeorm/data-source.ts",
  "migration:run": "npm run typeorm -- migration:run -d src/infrastructure/database/typeorm/data-source.ts"
}
```

---

## Variables de entorno

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=taskdb
```

En Docker, el hosta cambia al nombre del servicio definido en el archivo `docker-compose.yml`

---

## Instalación y ejecución

```bash
git clone https://github.com/JorgeRompiche/clean-architecture-task-api.git
cd clean-architecture-task-api
```
---

## Buenas prácticas implementadas

- No se exponen entidades internas directamente
- Uso de método toJSON() para respuestas HTTP al usar `express.json()`
- Casos de uso desacoplados
- Código organizado por responsabilidad
- Arquitectura preparada para persistencia real (TypeORM)
- Base preparada para JWT y autenticación futura

---

## Estado actual del proyecto

 - [x] Clean Architecture implementada
 - [x] Dominio desacoplado
 - [x] Casos de uso testables
 - [x] PostgreSQL real
 - [x] TypeORM
 - [x] Migraciones versionadas
 - [x] Dockerfile
 - [x] Docker Compose
 - [x] Middleware global de errores
 - [x] Logging estructurado
 - [x] Validación robusta
 - [ ] Autenticación JWT
 - [ ] Autorización basada en roles
 - [ ] CI con GitHub Actions
 - [ ] Coverage report

---

## Objetivo

- Practicar implementación de arquitectura moderna
- Practicar diseño desacoplado
- Practicar implementación con tecnologías JavaScript
- Practicar implementación de persistencia de datos con migraciones
- Practicar testing
  

