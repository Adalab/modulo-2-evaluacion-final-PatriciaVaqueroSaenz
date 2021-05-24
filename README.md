![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

# Evaluación Final Módulo 2 Adalab de Patricia Vaquero Sáenz

Este repo tiene incluído el Starter Kit creado en **node y gulp**. ¿Y qué es un Starter kit? Pues es una **plantilla de proyecto con funcionalidades preinstaladas y preconfiguradas**.

Este Kit incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local y muchas cosas más. El Kit nos ayuda a trabajar más cómodamente, nos automatiza tareas.

Hay 3 tipos de ficheros y carpetas:

- Los ficheros que están sueltos en la raíz del repositorio, como gulpfile.js, package.json... Son la configuración del proyecto.
- La carpeta `src/`: son los ficheros de la página web, como HTML, CSS, JS...
- Las carpetas `public/` y `docs/`, que son generadas automáticamente cuando arrancamos el proyecto. El Kit lee los ficheros que hay dentro de `src/`, los procesa y los genera dentro de `public/` y `docs/`.

## Guía de inicio rápido

> **NOTA:** Instalar previamente [Node JS](https://nodejs.org/) para trabajar con este repo:

### Pasos a seguir para arrancar el proyecto desde tu ordenador:

1. No clonar este repo (porque no podrás añadir commits), descargarlo.
1. Crear un repo nuevo y añadir los archivos descargados.
1. **Abre una terminal** en la carpeta raíz de tu repositorio.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que lo abras** Para ello ejecuta el comando:

```bash
npm start
```

Este comando:

- **Abre una ventana de Chrome y muestra la página web**, al igual que hace el plugin de VS Code Live Server (Go live).
- También **observa** todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS y los **genera y guarda en la carpeta `public/`**. Por ejemplo:
   - Convierte los ficheros SASS en CSS.
   - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

### Pasos para publicar el proyecto en GitHub Pages:

Para generar la página para producción ejecuta el comando:

```bash
npm run docs
```

Y a continuación:

1. Sube a tu repo la carpeta `docs/` que se te acaba de generar.

```bash
git add -A
git commit -m "commit message"
git push
```

1. Entra en la pestaña `settings` de tu repo.
1. Y en el apartado de GitHub Pages activa la opción **master branch /docs folder**.

Además, los comandos:

```bash
npm run push-docs
```
o

```bash
npm run deploy
```

son un atajo que nos genera la versión de producción y hace push de la carpeta `docs/` del tirón.

## Flujo de archivos con Gulp

Estas tareas de Gulp producen el siguiente flujo de archivos:

![Gulp flow](./gulp-flow.png)

## `gulpfile.js` y `config.json`

Nuestro **gulpfile.js** usa el fichero `config.json` de configuración con las rutas de los archivos a generar / observar.

De esta manera separarmos las acciones que están en `gulpfile.js` de la configuración de las acciones que están en `config.json`.

## Estructura de carpetas

La estructura de carpetas tiene esta pinta:

```
src
 ├─ api // los ficheros de esta carpeta se copian en public/api/
 |  └─ data.json
 ├─ images
 |  └─ logo.jpg
 ├─ js // los ficheros de esta carpeta se concatenan en el fichero main.js y este se guarda en public/main.js
 |  ├─ main.js
 |  └─ events.js
 ├─ scss
 |  ├─ components
 |  ├─ core
 |  ├─ layout
 |  └─ pages
 └─ html
    └─ partials
```

## Falta algo?

Cualquier duda o sugerencia será bienvenida.
