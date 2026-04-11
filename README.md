# Kódigo Fuente - Sistema de Soporte POS

Sistema de gestión de incidencias (Tickets) desarrollado como prueba técnica. Permite la creación, visualización, asignación y cambio de estado de tickets de soporte técnico, aplicando reglas de negocio estrictas.

## Arquitectura del Proyecto

El proyecto está estructurado como un monorepo para facilitar la evaluación y el despliegue local:
* `/backend`: API RESTful construida con Laravel y PostgreSQL.
* `/frontend`: Single Page Application (SPA) construida con React, Vite y Tailwind CSS.
* `/infra`: Archivos de orquestación de contenedores (`docker-compose.yml`).

## Requisitos Previos
* [Docker](https://www.docker.com/) y Docker Compose instalados.
* Git.

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto localmente en menos de 2 minutos.

### 1. Clonar el repositorio
\`\`\`bash
git clone <url-del-repositorio>
cd kodigo-incident
\`\`\`

### 2. Levantar la Infraestructura (Docker)
Toda la orquestación está centralizada en la carpeta `infra`.
\`\`\`bash
cd infra
IMPORTANTE EJECUTAR 
docker-compose up -d --build
docker-compose up
\`\`\`
*Esto levantará tres contenedores: Base de datos (PostgreSQL), Backend (PHP/Laravel) y Frontend (Node/Vite).*

### 3. Configurar el Backend
Abre una nueva terminal y ejecuta los siguientes comandos dentro del contenedor del backend para configurar el entorno, ejecutar migraciones y poblar la base de datos con usuarios de prueba.

\`\`\`bash
# Entrar al contenedor del backend
docker exec -it kodigo-backend bash

# Dentro del contenedor, ejecutar:
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed # Poblará los usuarios agentes
exit
\`\`\`

### 4. Acceder a la Aplicación
* **Frontend (Interfaz de Usuario):** [http://localhost:5173](http://localhost:5173)
* **Backend (API REST):** [http://localhost:8000/api](http://localhost:8000/api)

## Endpoints Principales (API)
* `GET /api/tickets`: Lista los tickets y retorna los contadores de estado.
* `POST /api/tickets`: Crea un nuevo ticket.
* `PATCH /api/tickets/{id}`: Cambia el estado del ticket (Valida que no esté Resuelto).
* `DELETE /api/tickets/{id}`: Eliminación lógica (Soft delete, valida que esté Abierto).
* `GET /api/users`: Retorna la lista de agentes disponibles.
