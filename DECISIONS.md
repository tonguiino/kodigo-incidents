# Decisiones Tecnológicas y Arquitectura

Este documento justifica las decisiones técnicas y de arquitectura tomadas durante el desarrollo de la prueba técnica para Kódigo Fuente.

## 1. Infraestructura y Orquestación
Se optó por una estructura de **Monorepo** separando la lógica en `/backend`, `/frontend` e `/infra`. 
* **Docker y Docker Compose:** Utilizado para garantizar la paridad entre los entornos de desarrollo y evaluación. Permite levantar todo el stack con un solo comando (`docker-compose up`).
* **Servidor de Desarrollo PHP:** Para el contenedor del backend, se decidió utilizar `php:8.2-cli` con el comando `php artisan serve` en lugar de una arquitectura compleja con Nginx y PHP-FPM. Esta decisión se tomó para facilitar la configuración, priorizando la agilidad para un entorno de prueba técnica sin sacrificar funcionalidad.

## 2. Backend (Laravel & PostgreSQL)
* **API RESTful:** Se utilizó Laravel por su robustez y velocidad de desarrollo a demas de ser uno de mis fuertes como desarrollador backend. 
* **Controladores Resource:** Se implementó `Route::apiResource` para adherirse a los estándares REST.
* **Integridad de Datos:** * Se implementaron validaciones estrictas mediante `Illuminate\Validation\Rule` para garantizar que los estados y prioridades sean valores exactos.
  * Se utilizó `SoftDeletes` en la tabla de tickets para prevenir la pérdida de datos históricos.
* **Reglas de Negocio:** Centralizadas en el controlador. Se bloquea activamente la edición de tickets en estado `Resuelto` y la eliminación de tickets que no estén en estado `Abierto` devolviendo códigos HTTP `403 Forbidden`.

## 3. Frontend (React, Vite & Tailwind CSS v4)
* **Vite:** Elegido como *bundler* por sus tiempos de compilación casi instantáneos y recarga en caliente superior (HMR) comparado con Create React App.
* **Estilos y UI:** Implementación de **Tailwind CSS v4** junto con **Shadcn UI (Radix)**. Tailwind v4 permite prescindir de configuraciones pesadas tradicionales, mientras que Shadcn ofrece componentes accesibles, modulares y altamente personalizables sin acoplarse a una librería de estilos predefinida.
* **Gestión del Estado:** Dada la escala de la aplicación (una única vista de Dashboard), se decidió no introducir gestores de estado globales complejos como Redux o Zustand. 
  * Se empleó una arquitectura de **"Componentes Inteligentes"**, donde cada bloque (`StatsCards`, `TicketTable`) es responsable de su propio *fetch* de datos mediante Axios.
  * **Reactividad cruzada:** Para mantener la interfaz sincronizada al crear un ticket desde `ModalGenerate` sin recargar la página, se implementó el patrón de emisión de eventos nativos del navegador (`window.dispatchEvent(new Event('ticketCreated'))`), logrando una experiencia SPA fluida y ligera.

## 4. CI/CD (GitHub Actions)
Se implementó un pipeline automatizado para asegurar la calidad del código:
* Ejecución de linter en el entorno Frontend para garantizar estándares de código.
* Construcción automatizada de las imágenes Docker (Frontend y Backend).
* Publicación automatizada en GitHub Packages (GHCR) en cada push a las ramas principales.