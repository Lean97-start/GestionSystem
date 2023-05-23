# Bienvenido!

Este es un sistema de gestión, el cúaal me permite hacer una gestión completa como usuario (Registro, inicio, cierre de sesión, darse de baja, etc) aplicando un método de seguridad (JsonWebToken). Otra funcionalidad del sistema es poder subir documentos y crear un registro de los mismo, asignando un propietario, un visibilidad, gruppo de ppersonas que pueden acceder, eliminarlo. Tambien podemos crear grupos de personas para que al momento de asignar un grupo de personas a un documento, sea mucho mas práctico.

<h2>¿Quien soy?</h2>
<p  align="left">      Soy un programador Full Stack ​🧑‍💻​ y estudiante avanzado de Ingeniería en sistemas de información 👨‍💻.</p>
<p  align="left"> Tanto Front-end como Back-end me son muy atractivos a la hora de trabajar, lo cual me lleva a esforzarme en ambos para que sea un programa totalmente escalable, organizado y realizado con muchas ganas. Soy fanático de la organización y de las buenas prácticas de la ingeniería de software</p>

<h2>Ahora sí, vamos a la documentación</h2>
# Documentación

Presentamos de lo que sería la primera iteración. En este proyecto se implemento el patrón de arquitectura Modelo-vista-controlador (MVC)

## Requerimientos

- Dar de alta un documento.
- Modificar un documento.
- Eliminar un documento.
- Ver todos los documentos.
- Ver detalle de un documento.
- Filtrar/Buscar documento por nombre/propietario/fechaSubida.
- Iniciar sesión usuario.
- Registrar usuario.
- Cerrar sesión usuario.
- Descargar documento.
- Asignar un usuario a un documento.
- Asignar grupo de usuarios a un documento.
- Asignar usuario a grupo.
- Sacar usuario de un grupo.
- Eliminar grupo.
- Cerrar sesión de cuenta con token expirado.
- Buscar grupo de usuarios por nombre

## Diagrama de clases

<a href="Server/Diagrama/CU_Crowdar.png"><img src="Server/Diagrama/CU_Crowdar.png" alt="Diagrama de clases" /></a>

# Mejoras a implementar para la segunda iteración
- Solamente el usuario que creo el grupo puede eliminarlo.
- Añadir roles (Admin, usuario común, etc.).
- El usuario puede bloquear a otros usuarios.
- Validación de registro con mail.
- Aplicar Unit test (UT).
- Individualizar el nombre del archivo.
- Aplicar mejoras de seguridad.


# Tecnologías implementadas
- **Back-End** 
    - Node.js
    - Express
    - Express-fileupload
    - JWT
    - Mongoose
    - Bcrypt
    - TypeScript
    - MongoDB

<a href="https://github.com/Lean97-start/GestionSystem/tree/main/Server" target="blank">Link al Backend</a>

- **Front-End** (En construcción)
    - React
    - HTML5
    - CSS3
    - JavaScript
    - Redux
    - Axios

<a href="https://github.com/Lean97-start/GestionSystem/tree/main/Client" target="blank">Link al Frontend</a>

# Puesta en marcha "Backend"

**ANOTACIÓN**
El proyecto no tiene ".env" por lo que son datos sensibles. Si lo desea, debe configurarlo para que no tome los asignados por defecto. (VER EN LA CARPETA "UTIL" => "Config" EL ARCHIVO "configENV").


- Debemos posicionarnos en la carpeta de server.
- En la consola, ejecutar "npm install", esto instalara las dependencias del proyecto.
- Una vez realizado esto, comprobamos que tenemos la instancia de MongoDB funcionando para almacenar los datos.
- En la consola ejecutamos "npm run build" para transpilar el código TypeScript a JavaScript (Manera mejorada).
- Para ejecutar el proyecto, colocamos en la consola "npm run start".
- Se adjunta una colección de "Postman" para poder hacer la request.

# Puesta en marcha "FrontEnd" (EN CONSTRUCCIÓN)

- Debemos posicionarnos en la carpeta de server.
- En la consola, ejecutar "npm install", esto instalara las dependencias del proyecto.
- Una vez realizado esto, comprobamos que tenemos la instancia de MongoDB funcionando para almacenar los datos.
- En la consola ejecutamos "npm run build" para transpilar el código TypeScript a JavaScript (Manera mejorada).
- Para ejecutar el proyecto, colocamos en la consola "npm run start".
- Se adjunta una colección de "Postman" para poder hacer la request.


</br>
<h1>Contactos: </h3>
<p align="left">
<a href="https://linkedin.com/in/leandro-morello/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="leandro-morello" height="30" width="40" /></a>
<a href="https://www.instagram.com/leaa_morello/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="leaa_morello" height="30" width="40" /></a>
  <a href="https://www.facebook.com/leoomorello/" target="blank"><img align="center" src="https://user-images.githubusercontent.com/71276668/169935334-b471a669-7c1b-435f-b245-308490dd1d4f.png" alt="leaa_morello" height="40" width="40" /></a>
  <a href="https://github.com/Lean97-start" target="blank"><img align="center" src="https://www.logotypes101.com/logos/612/3BF36CF1857F8854E2C416AC23E2397F/github_logo.png" alt="github" height="40" width="40" /></a>
</p>
