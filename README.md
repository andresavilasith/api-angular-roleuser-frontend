<p align="center"><a href="https://angular.io/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png" width="300"></a></p>

# Frontend - Angular 12 Sistema de roles y permisos
## [Backend realizado en Laravel](https://github.com/andresaviladw/api-laravel-roleuser-backend/) 

1. Descargar Nodejs en 
https://nodejs.org/es/

2. Clonar el repositorio

```js
git clone https://github.com/andresaviladw/api-angular-roleuser-frontend.git
```


3. Ejecutar 
```js
npm install
```


4. Para arreglar el error de sweetalert hay que entrar en `\node_modules\sweetalert\typings` en el archivo `sweetalert.d.ts` y borrar la linea: `const swal: SweetAlert;`

Tiene que quedar asi: 

```js
import swal, { SweetAlert } from "./core";

declare global {
  const sweetAlert: SweetAlert;
}

export default swal;
export as namespace swal;
```

5 Entrar a src/app/services/ abrir el archivo global.service.ts y pegar la clave de accesso generado en el backend que se encuentra y se indica como obtener en: [Backend realizado en Laravel](https://github.com/andresaviladw/api-laravel-roleuser-backend/) 


```js
export var global={
    clientSecret:'Escribir clave de acceso'
}
```


- Por ejemplo 
```js
export var global={
    clientSecret:'CnmUKWB7A6l0JeKVZIOrOYwWb4e7FFUEYkJjdkj0'
}
```

6. Iniciar ejecucion 
```js
ng serve 
```


