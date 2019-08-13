**Servicio de usuarios** (API REST)
====
Servicio que permite realizar acciones relacionadas con la administración de usuarios en la aplicación.


**Show User**
----
  Devuelve informacion json sobre usuarios.

* **URL**

  /user/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "error": false,
    "codigo": 200,
    "mensaje": "Respuesta del usuario",
    "respuesta": {
        "id": "user1",
        "name": "Nombre user1",
        "piloto": null,
        "destino": null
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "error": true,
    "codigo": 501,
    "mensaje": "El usuario no ha sido creado"
}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users?id=user1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Create User**
----
  Crea un usuario.

* **URL**

  /user/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   None
 

* **Data Params**

  * `id=[string]`
  * `name=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "error": false,
    "codigo": 200,
    "mensaje": "Usuario creado",
    "respuesta": {
        "id": "user5",
        "name": "Nombre user5"
    }
}`
 
* **Error Response:**

  * **Code:** 503 NOT FOUND <br />
    **Content:** `{
    "error": true,
    "codigo": 503,
    "mensaje": "El usuario ya fue creado previamente"
}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/",
      dataType: "json",
      type : "POST",
      data : { id:"user5", name:"Nombre user5" }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Delete User**
----
  Elimina un usuario.

* **URL**

  /user/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "error": false,
    "codigo": 200,
    "mensaje": "Usuario eliminado"
}`
 
* **Error Response:**

  * **Code:** 501 NOT FOUND <br />
    **Content:** `{
    "error": true,
    "codigo": 501,
    "mensaje": "El usuario no ha sido creado"
}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users?id=user1",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Assign Travel**
----
  Asigna un viaje a un usuario.

* **URL**

  /userviaje/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   None
 

* **Data Params**

  * `id=[string]`
  * `piloto=[string]`
  * `destino=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        error: false,
        codigo: 200,
        mensaje: 'Viaje asignado'
      }`
 
* **Error Response:**

  * **Code:** 503 NOT FOUND <br />
    **Content:** `{
        error: true,
        codigo: 501,
        mensaje: 'Error al asignar el viaje'
      }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/userviaje/",
      dataType: "json",
      type : "POST",
      data : { id:"user5", piloto:"piloto1", destino: "Aeropuerto la Aurora" }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Delete Travel**
----
  Desasigna un viaje para un usuario.

* **URL**

  /userviaje/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        error: false,
        codigo: 200,
        mensaje: 'Viaje terminado'
      }`
 
* **Error Response:**

  * **Code:** 501 NOT FOUND <br />
    **Content:** `{
        error: true,
        codigo: 501,
        mensaje: 'Error al desasignar el viaje'
      }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/userviaje?id=user1",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```