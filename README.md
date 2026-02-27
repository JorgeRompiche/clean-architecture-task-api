# Clean Architecture Task API

Backend REST API construida con **Node.js + TypeScript + Express**, aplicando principios de **Clean Architecture** y **Domain-Driven Design (DDD)**.


---

## Tech Stack

- Node.js
- TypeScript
- Express
- Jest (Unit Testing)
- Supertest (Integration Testing)
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
│ └── repositories/
│
├── presentation/   -> Controllers y capa HTTP
│ ├── __tests__/
│ ├── controllers/
│ ├── middleware/
│ └── routes/
│
└── main/           -> Bootstrap de la aplicación
```

### Principios aplicados

- El dominio no depende de frameworks
- Casos de uso desacoplados de infraestructura
- Inversión de dependencias
- Encapsulamiento del modelo
- Separación clara entre modelo interno y contrato HTTP
- Diseño orientado a testabilidad

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
- Validaciones de negocio
- Transiciones de estado
- Errores esperados

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

## Instalación y ejecución

```bash
git clone https://github.com/JorgeRompiche/clean-architecture-task-api.git
cd clean-architecture-task-api
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
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

## Siguientes versiones

### v2

 - [ ] Integración con TypeORM
 - [ ] PostgreSQL real
 - [ ] Middleware global de manejo de errores
 - [ ] Logging estructurado
 - [ ] Validación

### v3

 - [ ] Autenticación con JWT
 - [ ] Autorización basada en roles
 - [ ] Dockerfile
 - [ ] Docker Compose
 - [ ] CI con GitHub Actions

---

## Objetivo

- Practicar implementación de arquitectura moderna
- Practicar diseño desacoplado
- Practicar implementación con tecnologías JavaScript

