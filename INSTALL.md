# Instalación del Proyecto

** Cambiar los parámetros que se encuentran entre < > **
** "..." indican que existen otras líneas en el archivo **

1. Descargar nodejs (versión 6.x.x)
  ```
  $ sudo apt-get install curl
  $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  $ sudo apt-get install -y nodejs
  ```

2. En la raíz del proyecto instalar las dependencias necesarias
  ```
  $ npm install
  ```

3. La configuración de accesos del servicio se encuentran en el archivo *src/configurations/service.js*, la estructura es la siguiente:
  ```
  {
      usuario: 'nombreUsuario', // usuario proporcionado por el publicador
      clave: 'passwod', // password del usuario proporcionado
      wsdl: 'http://dominio.entidad/servicio', // endpoint para los servicios de operadores
      wsdlVehiculos: 'http://dominio.entidad/servicio', // endpoint para los servicios de vehículos
  }
  ```

4. Mover ó copiar el proyecto a */var/www* con el nombre ****nombre-servicio****
  ```
  $ sudo cp -R <nombre-carpeta> /var/www/****nombre-servicio****
  ```

5. Ahora, se instalará nginx con phusion passenger para publicar la aplicación. Para mayor información, revisar:
[Documentación de Nginx](https://www.nginx.com/resources/wiki/ "NGINX"), [Documentación de Passenger](https://www.phusionpassenger.com/documentation_and_support "Passenger").

  1. Para instalar passenger:
    ```
    $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
    $ sudo apt-get install -y apt-transport-https ca-certificates
    $ sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger jessie main > /etc/apt/sources.list.d/passenger.list'
    $ sudo apt-get update
    $ sudo apt-get install -y --force-yes nginx-extras passenger
    ```

  2. Configurar nginx para habilitar passenger, se debe modificar el archivo /etc/nginx/nginx.conf, y descomentar la línea *# include /etc/nginx/passenger.conf;* (quitar #).
    ```
    ...
    include /etc/nginx/passenger.conf;
    ...
    ```

  3. Para verificar que se haya configurado correctamente:
    - Reiniciar el servicio
    ```
    $ sudo service nginx restart
    ```
    - Si todo esta correcto, el siguiente comando devolvera *Everything looks good*:
    ```
    $ sudo /usr/bin/passenger-config validate-install
    ```
    - El siguiente comando no debe mostrar errores:
    ```
    $ sudo /usr/sbin/passenger-memory-stats
    ```

  4. Modificar el archivo */etc/nginx/sites-enabled/default* con el siguiente contenido (*Cambiar servidor.com por el dominio o la ip del servidor, o 0.0.0.0 para que escuche en cualquier dirección*):

  ```
  server {
          listen 80;
          server_name servidor.com;
          root /var/www;

          location ~ ^/****nombre-servicio****/****version****(/.*|$) {
                    alias /var/www/****nombre-servicio****/public$1;
                    passenger_base_uri /****nombre-servicio****;
                    passenger_app_root /var/www/****nombre-servicio****;
                    passenger_document_root /var/www/****nombre-servicio****/public;
                    passenger_enabled on;
                    passenger_app_env production;
                    passenger_app_type node;
                    passenger_startup_file index.js;
                    passenger_nodejs /usr/bin/node;
          }
  }
  ```

  5. Ahora para reiniciar el servicio con las configuraciones realizadas:
  ```
  $ sudo service nginx restart
  ```