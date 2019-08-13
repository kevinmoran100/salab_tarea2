**Servicio de rastreo** (API REST)
====
Servicio que permite rastrear a los pilotos.


**Piloto position**
----
  Obtiene la posición de un vehiculo.

* **URL**

  /getPosition/:id

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
      url: "/getPosicion?id=piloto1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```