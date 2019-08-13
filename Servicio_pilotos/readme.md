**Servicio de pilotos** (API REST)
====
Servicio que permite realizar acciones relacionadas con la administración de pilotos en la aplicación.


**Show Piloto**
----
  Devuelve informacion json sobre pilotos.

* **URL**

  /piloto/:id

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
    "mensaje": "Respuesta del piloto",
    "respuesta": {
        "id": "piloto1",
        "name": "Nombre piloto1",
        "ocupado": false
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "error": true,
    "codigo": 501,
    "mensaje": "El piloto no ha sido creado"
}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/pilotos?id=piloto1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Create piloto**
----
  Crea un piloto.

* **URL**

  /piloto/

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
    "mensaje": "piloto creado",
    "respuesta": {
        "id": "piloto5",
        "name": "Nombre piloto5"
    }
}`
 
* **Error Response:**

  * **Code:** 503 NOT FOUND <br />
    **Content:** `{
    "error": true,
    "codigo": 503,
    "mensaje": "El piloto ya fue creado previamente"
}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/piloto/",
      dataType: "json",
      type : "POST",
      data : { id:"piloto5", name:"Nombre piloto5" }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Delete piloto**
----
  Elimina un piloto.

* **URL**

  /piloto/:id

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
    "mensaje": "piloto eliminado"
}`
 
* **Error Response:**

  * **Code:** 501 NOT FOUND <br />
    **Content:** `{
    "error": true,
    "codigo": 501,
    "mensaje": "El piloto no ha sido creado"
}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/pilotos?id=piloto1",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Assign Travel**
----
  Asigna un viaje a un piloto.

* **URL**

  /pilotoviaje/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   None
 

* **Data Params**

  * `id=[string]`
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
      url: "/pilotoviaje/",
      dataType: "json",
      type : "POST",
      data : { id:"piloto5", destino: "Aeropuerto la Aurora" }
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Delete Travel**
----
  Desasigna un viaje para un piloto.

* **URL**

  /pilotoviaje/:id

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
      url: "/pilotoviaje?id=piloto1",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```