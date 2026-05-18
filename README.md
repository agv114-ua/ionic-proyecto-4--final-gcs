# Wiki Star Wars — Ionic Talleres 1-4 (GCS)

Aplicación móvil (Ionic 7 + Angular 17) desarrollada para la asignatura **Gestión de la Calidad del Software (34041)** del Grado en Ingeniería Informática de la Universidad de Alicante. Cubre los talleres 1, 2, 3 y 4 de Ionic.

**Autores:** Ángel Gonjar Verdejo · Erardo Aldana Pessoa

---

## Estructura del repo

```
ionic-proyecto-4--final-gcs/
├── appIonic/                <- proyecto Ionic (aquí está docker-compose.yml)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── src/
└── autores.txt
```

> **Importante:** todos los comandos `docker compose ...` se ejecutan dentro de `appIonic/`, **NO** en la raíz del repo.

---

## Arranque rápido con Docker

Desde PowerShell (o cualquier terminal):

```powershell
cd appIonic
docker compose run --rm taller_ionic "npm install"   # solo la primera vez o tras cambiar package.json
docker compose up -d
```

La app queda disponible en:

- http://localhost:8100

Para parar el contenedor:

```powershell
docker compose down
```

Para ver logs:

```powershell
docker compose logs -f taller_ionic
```

---

## Usuarios de prueba (login)

Mockup en `appIonic/src/assets/data/users.json`. Sirve cualquiera de estos:

| Email             | Contraseña |
|-------------------|------------|
| joan@server.cat   | 123456     |
| john@server.com   | 123456     |
| pepe@server.es    | 123456     |

Reglas de validación del formulario: email con formato correcto y contraseña de mínimo 6 caracteres. Credenciales incorrectas → `ion-alert` de error.

---

## Funcionalidades por taller

### Taller 1 — Primera App con Ionic
- Plantilla `tabs` con 4 pestañas: **Wiki**, **Favorites**, **About**, **Exit**.
- Iconos personalizados en cada pestaña.
- Toast de bienvenida (`Welcome to the Star Wars Wiki App!`) al cargar Wiki.
- Página `Exit` con `ion-card` y botones YES/NO (YES muestra alert, NO vuelve a Wiki).
- Página `About` con logo de Star Wars, descripción y copyright.

### Taller 2 — Componentes y Servicios
- Modelo `Category` y mockup `categories.json`.
- Componente `CategoryComponent` con `@Input` (`theCategory`, `selected`) y `@Output` (`clicked`).
- Servicio `WikiService` con `getAllArticles(category)` consumiendo la SWAPI (https://swapi.tech/api/).
- Al pulsar el ojo en una categoría se carga la lista de artículos de esa categoría.

### Taller 3 — Enrutado y Formularios
- **Routing parametrizado**: ruta `article/:cat/:id` dentro del módulo wiki → `/tabs/wiki/article/:cat/:id`.
- Modelos para detalle: `People`, `Planet`, `Species`, `Starship`.
- `WikiService.getArticle(category, id)` para detalle individual.
- Página `Article` con `ngSwitch` por categoría y `ion-badge` para los valores.
- Botón de volver atrás (`ion-back-button`).
- **Formulario login** con `FormBuilder`:
  - email (`required` + `email`)
  - password (`required` + `minLength 6`)
  - botón Entrar deshabilitado si el formulario es inválido
  - `ion-alert` con `[isOpen]="error!=''"` si las credenciales fallan
- Servicio `UserService` con `users.json` mockup.
- `app-routing` redirige a `/login` al arrancar; tras autenticarse navega a `/tabs`.

### Taller 4 — Storage y Menús
- **Menú lateral** (`ion-menu` con `menuId="principal"`, `contentId="main"`) cargado desde `assets/data/menu.json`.
- Botón hamburguesa (`ion-menu-button`) en las cabeceras de wiki, favorites, about, exit y article.
- Menú deshabilitado en login y habilitado al entrar en tabs (`MenuController` + `ionViewWillEnter`).
- **Servicio Storage** (`@ionic/storage-angular`) con `init/get/set`.
- En la página Article: icono estrella (`star`/`star-outline`) que alterna favorito + toast informativo.
- Página `Favorites` que lista los favoritos persistidos en LocalStorage; cada item navega de vuelta al detalle mediante `[href]="generateURL(cat, id)"`.

---

## Stack técnico

| Tecnología | Versión |
|------------|---------|
| Node       | 21.x (en la imagen Docker) |
| Angular    | 17.0.2 |
| Ionic      | 7.5.0 |
| Ionic CLI  | 7 |
| Storage    | @ionic/storage-angular 4.0.0 |
| API        | SWAPI (https://swapi.tech) |

---

## Ejecutar comandos del CLI dentro del contenedor

Cualquier `ionic g ...` o `npm install ...` se lanza así:

```powershell
cd appIonic
docker compose run --rm taller_ionic "ionic g page nueva-pagina"
docker compose run --rm taller_ionic "npm install paquete-nuevo --save"
```

---

## Entrega Moodle

Subir el repo **excepto** las carpetas `.angular` y `node_modules` (ya excluidas por `.gitignore`).
El fichero `autores.txt` está en la raíz del repo.

---

## Notas

- Para volver a la pantalla de login después de iniciar sesión, abre el menú lateral o navega manualmente a `/login`. La sesión es del lado del cliente (no hay backend de auth).
- Los nombres de categoría en la URL llegan capitalizados (`People`, `Planets`...) porque así están en `categories.json`. Internamente se convierten a minúscula para llamar al endpoint de SWAPI (que sirve `/people`, `/planets`, etc.). El `switch` de `article.page.ts` compara contra la versión capitalizada.
