var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var app = express()

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

// Router para rastrear un piloto
app.get('/rastrearpiloto', function (req, res) {
  var id = req.query.id
  if (id != null) {
    // Enviar peticion de posición al ESB
    // if (r != null) {
    //   console.log('[RASTREOPILOTO] El piloto ' + id + 'Se encuentra en la ubicación latitud: ' + r[0] + ', longitud: ' + r[1])
    //   respuesta = {
    //     error: false,
    //     codigo: 200,
    //     mensaje: 'Rastreo completado'
    //   }
    // } else {
    //   respuesta = {
    //     error: true,
    //     codigo: 501,
    //     mensaje: 'Error al rastrear al piloto'
    //   }
    //   console.log('[RASTREOPILOTO] Error al rastrear al piloto')
    // }
  }
  res.send(respuesta)
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
