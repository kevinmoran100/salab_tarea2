**ESB** (API REST)
====
Enterprise Service Bus


**Piloto position (Interno)**
----
  Obtiene la posición de un piloto.

* **URL**

  /getPositionPiloto/:id

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
        error: false,
        codigo: 200,
        mensaje: 'Rastreo completado'
      }`
 
* **Error Response:**

  * **Code:** 501 NOT FOUND <br />
    **Content:** `{
        error: true,
        codigo: 501,
        mensaje: 'Error al rastrear al piloto'
      }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/getPosicionPiloto?id=piloto1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



**Piloto position (Externo)**
----
  Obtiene la posición de un piloto.

* **URL**

  /rastrearpiloto/:id

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
        error: false,
        codigo: 200,
        mensaje: 'Rastreo completado'
      }`
 
* **Error Response:**

  * **Code:** 501 NOT FOUND <br />
    **Content:** `{
        error: true,
        codigo: 501,
        mensaje: 'Error al rastrear al piloto'
      }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/rastrearpiloto?id=piloto1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Solicitar viaje**
----
  Realiza la peticion de solicitud de viaje y le asigna un piloto.

* **URL**

  /solicitarviaje/:id & :destino

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
  * `id=[string]`
  * `destino=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        error: false,
        codigo: 200,
        mensaje: 'Viaje asignado'
      }`
 
* **Error Response:**

  * **Code:** 501 NOT FOUND <br />
    **Content:** `{
        error: true,
        codigo: 501,
        mensaje: 'Error al solicitar el viaje'
      }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/solicitarviaje?id=user1&destino=Aeropuerto",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```