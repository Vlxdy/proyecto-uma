# Versión 2.0.0
## Requerimientos
Requerimientos para Debian GNU/Linux 8.11 (Jessie)
- Nodejs 6.71.1 
- Npm 3.10.10 
- Nginx 1.15.8 
- Passenger 6.0.2 
## Servicios
Contempla los servicios de:

Api de la USO Operadores

- Capacidades
- Certificado caboco
- Operadores
- OperadoresRegistro
- Permisos
- Representantes
- Trámites

Api de la USO Vehículos
 - Permisos
 - Tarjetas
 - Vehículos
 - Última tarjeta

## Despliegue
El despliegue es manual, see realiza el proxy reverso con Nginx y Passenger

# Versión 2.0.1
## Requerimientos
Requerimientos para Debian GNU/Linux 12 (Bookworm)
- Nodejs 18.17.1 
- Nginx 1.22.1 
- PM2 5.3.0 
- Ansible core 2.14.3 ( Python = 3.11.2, Jinja = 3.1.2) 
- Gitlab-runner 16.2.1 

## Servicios
Api de la USO Operadores

- Capacidades
- Certificado caboco
- Operadores
- OperadoresRegistro
- Permisos
- Representantes
- Trámites

Api de la USO Vehículos
 - Permisos
 - Tarjetas
 - Vehículos
 - Última tarjeta


## Despliegue
El cliente proxy puede instalarse de forma manual [INSTALL.md](INSTALL.md). Asimismo, esta versión contempla despliegue automático con Ansible y Vault [INSTALL.md](./ansible/INSTALL.md)

Ambos procesos realizan el proxy reverso con Nginx y Pm2
