var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var rutaESB = 'http://localhost:8004/'

// Step 1 - Set the headers
var headers = {
  'User-Agent': 'Super Agent/0.0.1',
  'Content-Type': 'application/x-www-form-urlencoded'
}

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

// Router para rastrear un piloto
app.get('/rastrearpiloto', function (req, res) {
  console.log('[RASTREO] Recepcion de solitud de rastreo')
  var id = req.query.id
  if (id != null) {
    // Enviar peticion de posición al ESB
    // Configure the request
    var options = {
      url: rutaESB + 'getPosicionPiloto?id=' + id,
      method: 'GET',
      jar: true,
      headers: headers
    }
    // Do the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        respuesta = JSON.parse(body)
        console.log('[RASTREO] Solicitud respondida correctamente')
        res.send(respuesta)
      } else {
        console.log('[ERROR] Error al enviar peticion]')
        console.log(error)
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: 'Error en el servidor'
        }
        res.send(respuesta)
      }
    })
  } else {
    respuesta = {
      error: true,
      codigo: 404,
      mensaje: 'Falta id'
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

// Creacion del servidor en el puerto 8003
http.createServer(app).listen(8003, () => {
  console.log('Server started at http://localhost:8003')
})
