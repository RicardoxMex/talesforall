# Tales For All

**Tales For All** es una plataforma desarrollada en Laravel/React que genera cuentos utilizando inteligencia artificial con Perplexity. El proyecto permite a los usuarios generar historias únicas y personalizadas, las hisotias generadas se guardan en la base de datos ya sea para el mismo usuario o publicas

## Características

- Generación de cuentos personalizados utilizando IA.
- Almacenamiento de cuento generados por usuario
- Sistema de valoración de cuentos de 1 a 5 estrellas (Proximamente).
- Interfaz de usuario amigable y adaptable para dispositivos móviles, tabletas y escritorios.

## Requisitos

- PHP >= 8.2
- Composer
- Node.js y npm
- Laravel 11
- Perplexity API Key
- Herd para despliegue local

## Instalación

1. Clona el repositorio:

    ```bash
    #Clonar en la carperta Herd en windows C:\Users\tu-usuario\Herd
    git clone https://github.com/RicardoxMex/talesforall.git
    cd talesforall
    ```

2. Instala las dependencias de PHP:

    ```bash
    composer install
    ```

3. Instala las dependencias de JavaScript:

    ```bash
    npm install
    ```

4. Configura el archivo `.env`:

    - Copia el archivo `.env.example` a `.env`:

        ```bash
        cp .env.example .env
        ```

    - Configura las variables de entorno en el archivo `.env`:

        ```env
        APP_NAME=TalesForAll
        APP_ENV=local
        APP_KEY=base64:tu_clave_base64
        APP_DEBUG=true
        APP_URL=http://localhost

        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=tales_for_all
        DB_USERNAME=tu_usuario
        DB_PASSWORD=tu_contraseña

        VITE_PER_API_PUBLIC_KEY=tu_api_key_de_perplexity
        ```

5. Genera la clave de la aplicación:

    ```bash
    php artisan key:generate
    ```

6. Migra la base de datos:

    ```bash
    php artisan migrate --seed
    ```

7. Compila los assets:

    ```bash
    npm run dev
    ```


8. Inicia el servidor de desarrollo:

    ```bash
    #no necesario si usas Herd
    php artisan serve
    ```


## Uso

1. Accede a la plataforma en tu navegador:

    ```
    http://localhost:8000
    ```

2. Regístrate y/o inicia sesión.

3. Genera un nuevo cuento utilizando la funcionalidad de IA.

4. Valora los cuentos generados y explora los cuentos creados por otros usuarios.

## Contribución

¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Envía tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

