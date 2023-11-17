# Instalación del Proyecto

** Cambiar los parámetros que se encuentran entre < > **
** "..." indican que existen otras líneas en el archivo **

## Requerimientos 

1. Descargar nodejs (versión 18.x.x)

```bash
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
2. Instalar Nginx con el siguiente comando:

```bash
$ sudo apt-get install nginx
```

3. Instalar PM2

```bash
$ sudo apt update
$ sudo npm install --global pm2
```
Iniciar detección automática de configuración

```bash
$ pm2 startup
```
Ejecutar el comando devuelto por la anterior instrucción. por ejemplo
```bash
$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u usuario --hp /home/usuario
```

4. Instalar Build-essential
```bash
$ sudo apt-get install build-essential
```
## Instalación del Proyecto

1. Clonar el repositorio:

```bash
$ git clone https://gitlab.agetic.gob.bo/agetic/iop/iop-servicios-<plantilla>-v1.git
$ cd iop-servicios-<plantilla>-v1
```

2. En la raíz del proyecto instalar las dependencias necesarias

```bash
$ cd iop-servicios-<plantilla>-v1
$ npm install
```

3. Archivo de acceso al servicio, copiar el archivo

```bash
$ cd src/configurations
$ cp services.js.example services.js
  ```
  Cambiar las configuraciones con los accesos al servicio ejemplo
```js
module.exports = {
  usuario: 'user', // usuario proporcionado por USO
  clave: '123@abc',//clave del usuario 
  wsdl: '/url/del/servicio',
  wsdlVehiculos: '/url/del/servicio/vehículos',
  wsdlUso:'/url/del/servicio/uso',
  puerto:'3020', // Numero de puerto en el que se va a desplegar el cliente
};
```

4. Archivo de despliegue, copiar el archivo

```bash
$ cd src/configurations
$ cp app.js.example all.js
  ```
  Cambiar las configuraciones con los accesos al servicio ejemplo
```js
module.exports = {
  baseUrl: '/fake/uso',   // modificar la url por la cual se expone el servicio (fake ambiente de pruebas)
  domain: 'pagos.agetic.gob.bo',
  institution: 'AGETIC',
};

```

5. Mover ó copiar el proyecto a */opt/clientes_iop* con el nombre  *nombre-servicio*

```bash
$ sudo cp -R <nombre-carpeta> /opt/clientes_iop<nombre-servicio>
```

6. Iniciar el proyecto con PM2

```bash
$ pm2 start npm --name iop-servicios-uso-v1-3020 -- run start 
$ pm2 save
```

# Configuración de Nginx como proxy con PM2

7. Modificar el archivo */etc/nginx/sites-available/default* con el siguiente contenido (*Cambiar servidor.com por el dominio o la ip del servidor, o 0.0.0.0 para que escuche en cualquier dirección*):

```conf
server {
    listen 80;
    server_name 0.0.0.0;

    include /etc/nginx/sites-available/*.conf;
}
```
8. Crear un archivo *nombre-servicio.conf*  en el directorio */etc/nginx/sites-available/*

```conf
location ~ ^/fake/uso/v1(/.*|$) {     // url base del archivo  src/configurations/app.js  (fake ambiente de pruebas)
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
    
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    
        proxy_pass http://localhost:3020;  //puerto asignado en el paso 3
        proxy_redirect off;
        proxy_read_timeout 240s;
```

9. Ahora para reiniciar el servicio con las configuraciones realizadas:

```bash
$ sudo systemctl restart nginx 
```