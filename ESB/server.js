var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var request = require('request')
var request2 = require('request')
var app = express()

var rutaUsuario = 'http://localhost:8001/'
var rutaPiloto = 'http://localhost:8002/'
var rutaRastreo = 'http://localhost:8003/'

// Headers para las peticiones http
var headers = {
  'User-Agent': 'Super Agent/0.0.1',
  'Content-Type': 'application/x-www-form-urlencoded'
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
}

// Router raiz de api
app.get('/', function (req, res) {
  respuesta = {
    error: true,
    codigo: 200,
    mensaje: 'Bienvenido al servicio de pilotos'
  }
  res.send(respuesta)
})

/* -------------------------------------------------------------------------- */
/*                                   Routers                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                            Solicitudes internas                            */
/* -------------------------------------------------------------------------- */

// Router para rastrear un piloto
app.get('/getPosicionPiloto', function (req, res) {
  console.log('[ESB] (Interna) Recepcion de solicitud de posicion de piloto ')
  var id = req.query.id
  if (id != null) {
    // Si viene el parametro id
    // Realizar la peticion al servicio de pilotos para obtener la posicion
    var options = {
      url: rutaPiloto + 'getPosicion?id=' + id,
      method: 'GET',
      jar: true,
      headers: headers
    }
    request(options, function (error, response, body) {
      // Función para manejar la respuesta
      if (!error && response.statusCode === 200) { // Si es una respuesta positiva
        var respuesta = JSON.parse(body)
        res.send(respuesta).status(response.statusCode) // Devolver la respuesta
        console.log('[ESB] (Interna) Peticion devuelta correctamente ')
      } else { // Si existe error
        console.log('[ERROR] Error al enviar peticion]')
        console.log(error)
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: 'Error en el servidor'
        }
        res.send(respuesta) // Devolver mensaje de error
        console.log('[ESB] (Interna) Peticion devuelta con error')
      }
    })
  } else { // No vienen completos los parametros
    respuesta = {
      error: true,
      codigo: 404,
      mensaje: 'Debe enviar un id'
    }
    res.send(respuesta)
  }
})

/* -------------------------------------------------------------------------- */
/*                            Solicitudes externas                            */
/* -------------------------------------------------------------------------- */

// Router para rastrear un piloto
app.get('/rastrearpiloto', function (req, res) {
  console.log('[ESB] (Externa) Recepcion de solicitud de posicion de piloto ')
  var id = req.query.id
  if (id != null) {
    // Si el parametro id esta presente realizar la solicitud del rastreo al servicio
    var options = {
      url: rutaRastreo + 'rastrearpiloto?id=' + id,
      method: 'GET',
      jar: true,
      headers: headers
    }
    request(options, function (error, response, body) {
      // Función para manejar la respuesta
      if (!error && response.statusCode === 200) { // Respuesta positiva
        var respuesta = JSON.parse(body)
        res.send(respuesta).status(response.statusCode) // Devolver respuesta
        console.log('[ESB] (Externa) Peticion devuelta correctamente ')
      } else { // Respuesta con error
        console.log('[ERROR] Error al enviar peticion]')
        console.log(error)
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: 'Error en el servidor'
        }
        res.send(respuesta)
        console.log('[ESB] (Externa) Peticion devuelta con error')
      }
    })
  } else { // Parámetros incompletos
    respuesta = {
      error: true,
      codigo: 404,
      mensaje: 'Debe enviar un id'
    }
    res.send(respuesta)
  }
})

// Router para solicitar viaje
app.get('/solicitarviaje', function (req, res) {
  console.log('[ESB] (Externa) Recepcion de solicitud de asignacion de viaje ')
  var id = req.query.id
  var destino = req.query.destino
  if (id != null && destino != null) {
    // Si estan presentes los parametros, enviar la peticion al servicio de pilotos para solicitar un piloto
    var options = {
      url: rutaPiloto + 'pilotoviaje?id=' + id + '&destino=' + destino,
      method: 'POST',
      jar: true,
      headers: headers
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) { // Respuesta positiva
        // Obtener el piloto asignarlo y realizar la petición al servicio de usuarios para guardarlo y notificar
        var respuesta = JSON.parse(body)
        var piloto = respuesta['respuesta']['piloto']
        // Configure the request
        var options2 = {
          url: rutaUsuario + 'userviaje?id=' + id + '&destino=' + destino + '&piloto=' + piloto,
          method: 'POST',
          jar: true,
          headers: headers
        }
        request2(options2, function (error2, response2, body2) {
          var respuesta2 = JSON.parse(body2)
          res.send(respuesta2).status(response2.statusCode) // Devolver la respuesta
          console.log('[ESB] (Externa) Peticion devuelta correctamente ')
        })
      } else { // Respuesta con error
        console.log('[ERROR] Error al enviar peticion]')
        console.log(error)
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: 'Error en el servidor'
        }
        res.send(respuesta)
        console.log('[ESB] (Externa) Peticion devuelta con error')
      }
    })
  } else { // Parametros incompletos
    respuesta = {
      error: true,
      codigo: 404,
      mensaje: 'Debe enviar parametros'
    }
    res.send(respuesta)
  }
})

// Router para terminar viaje
app.delete('/terminarviaje', function (req, res) {
  console.log('[ESB] (Externa) Recepcion de solicitud de finalización de viaje ')
  var id = req.query.id
  if (id != null) {
    // Si los parametros están completos, enviar la peticion al servicio de usuarios para podes terminar el viaje, se obtiene el id del piloto para marcarlo como desocupado
    var options = {
      url: rutaUsuario + 'userviaje?id=' + id,
      method: 'DELETE',
      jar: true,
      headers: headers
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) { // Respuesta positiva
        // Se obtiene el id y se manda la peticion al servicio de pilotos para marcar al piloto como desocupado
        var respuesta = JSON.parse(body)
        var piloto = respuesta['respuesta']['piloto']
        // Configure the request
        var options2 = {
          url: rutaPiloto + 'pilotoviaje?id=' + piloto,
          method: 'DELETE',
          jar: true,
          headers: headers
        }
        request2(options2, function (error2, response2, body2) {
          var respuesta2 = JSON.parse(body2)
          res.send(respuesta2).status(response2.statusCode) // Devolver la respuesta
          console.log('[ESB] (Externa) Peticion devuelta correctamente ')
        })
      } else { // Respuesta con error
        console.log('[ERROR] Error al enviar peticion]')
        console.log(error)
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: 'Error en el servidor'
        }
        res.send(respuesta)
        console.log('[ESB] (Externa) Peticion devuelta con error')
      }
    })
  } else { // Parametros incompletos
    respuesta = {
      error: true,
      codigo: 404,
      mensaje: 'Debe enviar parametros'
    }
    res.send(respuesta)
  }
})

// Router para rutas no especificadas
app.use(function (req, res, next) {
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: 'URL no encontrada'
  }
  res.status(404).send(respuesta)
})

// Creacion del servidor en el puerto 8004
http.createServer(app).listen(8004, () => {
  console.log('Server started at http://localhost:8004')
})
