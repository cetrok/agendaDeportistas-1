# Sistema de Agendamiento de Clases - Agenda Deportistas

Esta es una aplicación web Frontend desarrollada en **React** y **Chakra UI** diseñada para la gestión integral de clases, deportistas, profesores y sedes de un club o centro deportivo.

## 🎯 Propósito de la Aplicación

El objetivo principal de la aplicación es proveer una interfaz centralizada y amigable para llevar a cabo procesos administrativos y operativos tales como:

- **Gestión de Cursos**: Creación y administración de los diferentes cursos o modalidades ofrecidos (con clasificación por edades, niveles y categorías).
- **Gestión de Profesores**: Registro de datos de docentes y configuración de sus franjas de disponibilidad horaria.
- **Gestión de Ubicaciones (Sedes)**: Control de las sedes disponibles y sus horarios de apertura/cierre.
- **Gestión de Deportistas**: Proceso de inscripción de deportistas, registro de acudientes, captura de condiciones médicas y carga de fotografías/documentos.
- **Agendamiento de Clases (Grupos)**: Creación de grupos asignando un curso, un profesor, una sede y el horario específico, validando la disponibilidad del docente.
- **Recordatorios y Cumpleaños**: Panel de inicio interactivo para llevar el control de recordatorios internos y visualizar rápidamente a los deportistas que cumplen años en el mes actual.

## 🚀 Tecnologías Principales

- **React 18**
- **Chakra UI** (Librería de componentes visuales)
- **Axios** (Para peticiones HTTP al backend)
- **Vite / Webpack** (Empaquetador del proyecto)

## 📋 Requisitos Previos

Para poder ejecutar este proyecto localmente, necesitas tener instalado:

- **Node.js** (versión 16.x o superior recomendada).
- **NPM** o **Yarn** como gestor de paquetes.
- El **Servidor Backend** (API REST) debe estar en ejecución, ya que la aplicación Frontend realiza peticiones de red por defecto a `http://localhost:8080/api/`.

## ⚙️ Paso a Paso para la Ejecución Local

Sigue estos pasos para instalar y levantar la aplicación en tu entorno de desarrollo local:

### 1. Clonar el repositorio y acceder al directorio

Abre tu terminal y navega hasta la carpeta del proyecto Frontend:

```bash
cd d:\Workspace\AgendaDeportistas\agendaDeportistas
```

### 2. Instalar las dependencias

Instala todos los paquetes de Node requeridos por el proyecto:

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

Arranca la aplicación web:

```bash
npm run dev
```

_(Nota: Si usas Create React App en lugar de Vite, el comando podría ser `npm start`)_

### 4. Acceder a la Aplicación

Abre tu navegador web y dirígete a la URL que te indique la consola (generalmente suele ser `http://localhost:5173` o `http://localhost:3000`).
