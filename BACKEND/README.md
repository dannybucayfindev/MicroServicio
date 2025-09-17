# BACKEND
[![BackendCoreFinance](https://github.com/CoreFinantix/BACKEND/actions/workflows/development.yml/badge.svg)](https://github.com/CoreFinantix/BACKEND/actions/workflows/development.yml)
Repositorio principal del proyecto.

## CONFIGURAR SUBMODULOS
### Pasos para crear los Git Submodules


1. Obtener la url del microservicio
1.2. Añadir el submodule, donde `repository_url` es la url del repositorio y `directory_name` es el nombre de la carpeta donde quieres que se guarde el sub-módulo (no debe de existir en el proyecto)
```
git submodule add <repository_url> <directory_name>
```
3. Agregar el microservicio

* 8000 MS-CORE Microservicio de Core(gateway): ``` git submodule add https://github.com/CoreFinantix/MS-CORE.git ms-core ```
* 8001 MS-AUTH Microservicio de Core(gateway): ``` git submodule add https://github.com/CoreFinantix/MS-AUTH.git ms-auth ```
* 8002 MS-PERSO Microservicio de Cliente: ``` git submodule add https://github.com/CoreFinantix/MS-PERSO.git ms-perso ```
* 8012 MS-CONFI Microservicio de Orden: ``` git submodule add https://github.com/CoreFinantix/MS-CONFI.git ms-confi ```

4. Añadir los cambios al repositorio (git add, git commit, git push)




## Importante
* Si se trabaja en el repositorio que tiene los sub-módulos, **primero actualizar y hacer push** en el sub-módulo y **después** en el repositorio principal. 
Si se hace al revés, se perderán las referencias de los sub-módulos en el repositorio principal y tendremos que resolver conflictos.

* Inicializar y actualizar Sub-módulos, cuando alguien clona el repositorio por primera vez, debe de ejecutar el siguiente comando para inicializar y actualizar los sub-módulos
```
git submodule update --init --recursive
```
* Para actualizar las referencias de los sub-módulos
```
git submodule update --remote
```


## Despligue a producción
* Creacion de un Personal Access Token (PAT) en GitHub, para acceder a los repositorios privados de los submódulos desde GitHub Actions.
1. pasos claros para crear un Personal Access Token (PAT) en GitHub:
    * Ir a la configuración de tu cuenta
    * Ingresa a GitHub y haz click en tu foto de perfil → Settings (Configuración).
    * En el menú lateral izquierdo, selecciona Developer settings.
2. Crear un nuevo token
    * Haz click en Generate new token → Generate new token (classic).
    * Dale un nombre descriptivo (por ejemplo: CI BackendCoreFinance).
    * Configura la fecha de expiración que desees (puede ser 30 días, 90 días o sin expiración).
    * Luego haz click en Personal access tokens → Tokens (classic).

3. Asignar permisos
    * Para poder clonar repos privados (submódulos) necesitas:
    * Marcar la opción repo → “Full control of private repositories”.
    * Opcionalmente: workflow si quieres que el token maneje acciones sobre workflows.

4. Guardar el token en tu repo
    * Ve a tu repo principal → Settings → Secrets and variables → Actions → New repository secret
    * Nómbralo, por ejemplo: PAT_TOKEN.
    * Pega el token que copiaste y guarda.


* Para desplegar los contenedores en producción, primero se deben construir las imágenes:
```
docker compose -f .\docker-compose.prod.yml build
```
* Para desplegar los contenedores en segundo plano, se puede usar el flag `-d`:
```
docker compose -f .\docker-compose.prod.yml up -d
```
