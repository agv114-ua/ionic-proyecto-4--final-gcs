# Wiki Star Wars — Ionic Talleres 1-4 (GCS)

Aplicacion movil (Ionic 7 + Angular 17) desarrollada para la asignatura **Gestion de la Calidad del Software (34041)** del Grado en Ingenieria Informatica de la Universidad de Alicante. Cubre los talleres 1, 2, 3 y 4 de Ionic, mas un conjunto de mejoras de calidad documentadas al final.

**Autores:** Angel Gonjar Verdejo - Erardo Aldana Pessoa

---

## Estructura del repo

```
ionic-proyecto-4--final-gcs/
|-- appIonic/                <- proyecto Ionic (aqui esta docker-compose.yml)
|   |-- Dockerfile
|   |-- docker-compose.yml
|   |-- package.json
|   `-- src/
`-- autores.txt
```

> **Importante:** todos los comandos `docker compose ...` se ejecutan dentro de `appIonic/`, **NO** en la raiz del repo.

---

## Arranque rapido con Docker

```powershell
cd appIonic
docker compose run --rm taller_ionic "npm install"   # solo la primera vez o tras cambiar package.json
docker compose up -d
```

App disponible en: http://localhost:8100

Comandos utiles:
```powershell
docker compose down                       # parar el contenedor
docker compose logs -f taller_ionic       # ver logs
docker compose restart taller_ionic       # reiniciar tras cambios manuales
```

---

## Usuarios de prueba (login)

Mockup en `appIonic/src/assets/data/users.json`:

| Email             | Contrasena |
|-------------------|------------|
| joan@server.cat   | 123456     |
| john@server.com   | 123456     |
| pepe@server.es    | 123456     |

Reglas: email con formato correcto y contrasena de minimo 6 caracteres. Credenciales incorrectas -> ion-alert de error.

---

## Funcionalidades por taller

### Taller 1 - Primera App con Ionic
- Plantilla `tabs` con 4 pestanas: Wiki, Favorites, About, Exit.
- Iconos personalizados, toast de bienvenida en Wiki.
- Exit con ion-card y botones YES/NO; About con logo, descripcion y copyright.

### Taller 2 - Componentes y Servicios
- Modelo `Category` y mockup `categories.json`.
- Componente `CategoryComponent` con `@Input` (`theCategory`, `selected`) y `@Output` (`clicked`).
- `WikiService.getAllArticles(category)` consumiendo SWAPI (https://swapi.tech/api/).

### Taller 3 - Enrutado y Formularios
- Ruta dinamica `/tabs/wiki/article/:cat/:id`.
- Modelos `People`, `Planet`, `Species`, `Starship`.
- `WikiService.getArticle(category, id)`.
- Pagina `Article` con ngSwitch + ion-badge y boton de volver.
- Formulario login (FormBuilder) con validaciones (email + minLength 6), ion-alert si falla.
- `UserService` + `users.json`.

### Taller 4 - Storage y Menus
- Menu lateral cargado desde `assets/data/menu.json` con MenuController.
- `<ion-menu-button>` en cabeceras de wiki, favorites, about, exit, article.
- `@ionic/storage-angular` + `StorageService` (`init/get/set`).
- Toggle favorito en Article con icono star/star-outline + toast.
- Pagina Favorites lista los favoritos y navega al detalle.

---

## Mejoras de calidad anadidas (sobre lo pedido en los PDFs)

Todas alineadas con los criterios de evaluacion de GCS (usabilidad, accesibilidad, robustez, calidad de codigo):

1. **Autenticacion completa**
   - `AuthService` con sesion persistente en Storage (auto-login al reabrir la app).
   - `authGuard` funcional protegiendo `/tabs` (si no hay sesion redirige a `/login`).
   - Opcion **Logout** en el menu lateral que limpia el storage y vuelve a login.

2. **UX y robustez ante errores de red**
   - `ion-loading` mientras se consulta SWAPI (lista y detalle).
   - Toast con color `danger` si la API falla.

3. **Buscador en la lista de articulos**
   - `ion-searchbar` con debounce que filtra por nombre.
   - Mensaje "No results." cuando no hay coincidencias.

4. **Swipe-to-delete + pull-to-refresh en Favorites**
   - `ion-item-sliding` con boton rojo y icono trash para eliminar un favorito deslizando.
   - `ion-refresher` que recarga la lista del Storage.
   - Toast informativo al borrar un favorito.

5. **Accesibilidad**
   - `aria-label` en botones de iconos.
   - `aria-hidden="true"` en iconos decorativos.
   - `alt` descriptivo en las imagenes de categoria.

---

## Stack tecnico

| Tecnologia | Version |
|------------|---------|
| Node       | 21.x (imagen Docker) |
| Angular    | 17.0.2 |
| Ionic      | 7.5.0 |
| Ionic CLI  | 7 |
| Storage    | @ionic/storage-angular 4.0.0 |
| API        | SWAPI (https://swapi.tech) |

---

## Ejecutar comandos del CLI dentro del contenedor

```powershell
cd appIonic
docker compose run --rm taller_ionic "ionic g page nueva-pagina"
docker compose run --rm taller_ionic "npm install paquete-nuevo --save"
```

---

## Entrega Moodle

Subir el repo **excepto** las carpetas `.angular` y `node_modules` (excluidas por `.gitignore`). El fichero `autores.txt` esta en la raiz.

---

## Notas de implementacion

- Los nombres de categoria viajan capitalizados (`People`, `Planets`...) por ser asi en `categories.json`. Internamente se pasan a minuscula para llamar a SWAPI (`/people/`, `/planets/`...). El `switch` de `article.page.ts` compara la version capitalizada.
- El `tabs-routing.module.ts` declara `path: ''` porque `app-routing` ya monta el modulo bajo `/tabs`. Repetir `path: 'tabs'` dentro provocaria rutas tipo `/tabs/tabs/wiki` y fallo NG04002.
- El `StorageService` envuelve la promesa de `storage.create()` y todas las llamadas a `get/set` esperan a esa promesa antes de operar.
