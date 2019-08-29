var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let respuesta = ''

// Array para pilotos
var pilotos = [{ id: 'piloto1', name: 'Nombre piloto1', ocupado: false }, { id: 'piloto2', name: 'Nombre piloto2', ocupado: false }, { id: 'piloto3', name: 'Nombre piloto3', ocupado: false }, { id: 'piloto4', name: 'Nombre piloto4', ocupado: false }]

/**
 * Funcion para encontrar un piloto
 *
 * @param {*} id id del piloto a encontrar
 * @returns devuelve el elemento buscado, de lo contrario null
 */
function buscarPiloto (id) {
  for (let i = 0; i < pilotos.length; i++) {
    var element = pilotos[i]
    if (element.id === id) {
      return element
    }
  }
  return null
}

/**
 * Funcion para asignar el viaje a un piloto
 *
 * @param {*} idusuario id del usuario al que se le asignara el viaje
 * @param {*} destino destino del viaje
 * @returns true si se realizo la asginacion correctamente, false si no se econtro el piloto al que se le debia asginar el viaje
 */
function asignarPiloto (idusuario, destino) {
  for (let i = 0; i < pilotos.length; i++) {
    var element = pilotos[i]
    if (!element.ocupado) {
      element.ocupado = true
      return element.id
    }
  }
  return null
}

/**
 * Funcion para desocupar piloto
 *
 * @param {*} idpiloto id del piloto a desasignar
 * @returns true si se realizo la desasginacion correctamente, false si no se econtro el piloto al que se le debia desasignar el viaje
 */
function desocuparPiloto (idpiloto) {
  for (let i = 0; i < pilotos.length; i++) {
    var element = pilotos[i]
    if (element.id === idpiloto) {
      element.ocupado = false
      return true
    }
  }
  return false
}

/**
 * Funcion para rastrear piloto
 *
 * @param {*} idpiloto id del piloto a rastrear
 * @returns null si no se encontro el piloto, si no dos numeros random simulando latitud y longitud
 */
function getPosicion (id) {
  for (let i = 0; i < pilotos.length; i++) {
    var element = pilotos[i]
    if (element.id === id) {
      return [Math.random(), Math.random()]
    }
  }
  return null
}

// Router raiz de api
app.get('/', function (req, res) {
  respuesta = 'Bienvenido al servicio de pilotos'
  res.send(respuesta)
})

/* -------------------------------------------------------------------------- */
/*                                   Routers                                  */
/* -------------------------------------------------------------------------- */

// Router para obtener pilotos, si viene el parametro id se devuelve un piloto, de lo contrario devuelve todos
app.get('/piloto', function (req, res) {
  respuesta = ''
  var id = req.query.id
  if (id != null) {
    // Si no viene ningun id
    var piloto = buscarPiloto(id)
    if (piloto == null) {
      // si no se encontro el piloto
      respuesta = 'El piloto no ha sido creado'
      console.log('[GETPILOTOS] No se encontró el piloto')
    } else {
      // Si se encontro el piloto
      respuesta = piloto
      console.log('[GETPILOTOS] Se devolvio la informacion del piloto: ' + piloto.id)
    }
  } else {
    // Si venia un id como parametro
    respuesta = pilotos
    console.log('[GETPILOTOS] Se devolvio la informacion de todos los pilotos')
  }
  res.send(respuesta)
})

// Router para guardar un nuevo piloto
app.post('/piloto', function (req, res) {
  if (!req.body.id || !req.body.name) {
    // Si no vienen los parametros completos
    respuesta = 'El campo id y name son requeridos'
    console.log('[POSTPILOTO] Error: campos faltantes')
  } else {
    // Los parametros no están completos
    var piloto = buscarPiloto(req.body.id)
    if (piloto != null) {
      // No se encontro el piloto
      respuesta = 'El piloto ya fue creado previamente'
      console.log('[POSTPILOTO] Error: el piloto ya fue creado previamente')
    } else {
      // Se encontró el piloto
      piloto = {
        id: req.body.id,
        name: req.body.name,
        ocupado: false
      }
      // Guardarlo en el arreglo
      pilotos.push(piloto)
      respuesta = piloto
      console.log('[POSTPILOTO] El piloto ' + piloto.id + ' fue creado')
    }
  }
  res.send(respuesta)
})

// Router para borrar un piloto
app.delete('/piloto', function (req, res) {
  var id = req.query.id
  if (id != null) {
    // Si viene el parametro id
    var piloto = buscarPiloto(id)
    if (piloto == null) {
      // No se encontró el piloto
      respuesta = 'El piloto no ha sido creado'
      console.log('[DELETEPILOTO] Error: El piloto no ha sido creado')
    } else {
      // Se encontró el piloto
      respuesta = 'piloto eliminado'
      console.log('[DELETEPILOTO] piloto ' + piloto.id + ' eliminado')
      // Eliminar el piloto del arreglo
      pilotos.splice(pilotos.indexOf(piloto), 1)
    }
  }
  res.send(respuesta)
})

// Router para asignar un piloto
app.post('/pilotoviaje', function (req, res) {
  var id = req.query.id
  var destino = req.query.destino
  if (id != null) {
    // Si viene el parametro id
    var r = asignarPiloto(id, destino)
    if (r != null) {
      console.log('[PILOTOVIAJE] Se asigno el viaje para el usuario ' + id + ' con el piloto ' + r + ' hacia el destino: ' + destino)
      respuesta = r
    } else {
      respuesta = 'Error al asignar el viaje'
      console.log('[PILOTOVIAJE] Error al asginar el viaje para el usuario ' + id + ' con el piloto ' + r + ' hacia el destino: ' + destino)
    }
  }
  res.send(respuesta)
})

// Router para desasignar un viaje
app.delete('/pilotoviaje', function (req, res) {
  var id = req.query.id
  if (id != null) {
    var r = desocuparPiloto(id)
    if (r) {
      console.log('[PILOTOVIAJE] Se termino el viaje para el piloto ' + id)
      respuesta = 'Viaje terminado'
    } else {
      respuesta = 'Error al desasignar el viaje'
      console.log('[PILOTOVIAJE] Error al terminar el viaje')
    }
  }
  res.send(respuesta)
})

// Router para obtener posicion de piloto
app.get('/getPosicion', function (req, res) {
  var id = req.query.id
  if (id != null) {
    var r = getPosicion(id)
    if (r != null) {
      console.log('[RASTREOPILOTO] El piloto ' + id + ' Se encuentra en la ubicación latitud: ' + r[0] + ', longitud: ' + r[1])
      respuesta = { latitud: r[0], longitud: r[1] }
    } else {
      respuesta = 'Error al obtener posicion'
      console.log('[POSICIONPILOTO] Error al obtener posicion')
    }
  }
  res.send(respuesta)
})

// Router para rutas no especificadas
app.use(function (req, res, next) {
  respuesta = 'URL no encontrada'
  res.status(404).send(respuesta)
})

// Creacion del servidor en el puerto 8002
http.createServer(app).listen(8002, () => {
  console.log('Server started at http://localhost:8002')
})
