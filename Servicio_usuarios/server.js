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

// Array para usuarios
var users = [{ id: 'user1', name: 'Nombre user1', piloto: null, destino: null }, { id: 'user2', name: 'Nombre user2', piloto: null, destino: null }, { id: 'user3', name: 'Nombre user3', piloto: null, destino: null }, { id: 'user4', name: 'Nombre user4', piloto: null, destino: null }]

/**
 * Funcion para encontrar un usuario
 *
 * @param {*} id id del usuario a encontrar
 * @returns devuelve el elemento buscado, de lo contrario null
 */
function buscarUsuario (id) {
  for (let i = 0; i < users.length; i++) {
    var element = users[i]
    if (element.id === id) {
      return element
    }
  }
  return null
}

/**
 * Funcion para asignar el viaje a un usuario
 *
 * @param {*} idusuario id del usuario al que se le asignara el viaje
 * @param {*} piloto id del piloto que hará el viaje
 * @param {*} destino destino del viaje
 * @returns true si se realizo la asginacion correctamente, false si no se econtro el usuario al que se le debia asginar el viaje
 */
function asignarViaje (idusuario, piloto, destino) {
  for (let i = 0; i < users.length; i++) {
    var element = users[i]
    if (element.id === idusuario) {
      element.piloto = piloto
      element.destino = destino
      return true
    }
  }
  return false
}

/**
 * Funcion para desasignar un viaje
 *
 * @param {*} idusuario id del usuario a desasignar
 * @returns true si se realizo la asginacion correctamente, false si no se econtro el usuario al que se le debia asginar el viaje
 */
function terminarViaje (idusuario) {
  for (let i = 0; i < users.length; i++) {
    var element = users[i]
    if (element.id === idusuario) {
      if (element.piloto == null) {
        return null
      } else {
        var viejopiloto = element.piloto
        element.piloto = null
        element.destino = null
        return viejopiloto
      }
    }
  }
  return null
}

// Router raiz de api
app.get('/', function (req, res) {
  respuesta = {
    error: true,
    codigo: 200,
    mensaje: 'Bienvenido al servicio de usuarios'
  }
  res.send(respuesta)
})

/* -------------------------------------------------------------------------- */
/*                                   Routers                                  */
/* -------------------------------------------------------------------------- */

// Router para obtener usuarios, si viene el parametro id se devuelve un usuario, de lo contrario devuelve todos
app.get('/user', function (req, res) {
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
  }
  var id = req.query.id
  if (id != null) {
    // Si no viene ningun id
    var usuario = buscarUsuario(id)
    if (usuario == null) {
      // si no se encontro el usuario
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
      }
      console.log('[GETUSERS] No se encontró el usuario')
    } else {
      // Si se encontro el usuario
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Respuesta del usuario',
        respuesta: usuario
      }
      console.log('[GETUSERS] Se devolvio la informacion del usuario: ' + usuario.id)
    }
  } else {
    // Si venia un id como parametro
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Respuesta del usuario',
      respuesta: users
    }
    console.log('[GETUSERS] Se devolvio la informacion de todos los usuarios')
  }
  res.send(respuesta)
})

// Router para guardar un nuevo usuario
app.post('/user', function (req, res) {
  if (!req.body.id || !req.body.name) {
    // Si no vienen los parametros completos
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo id y name son requeridos'
    }
    console.log('[POSTUSER] Error: campos faltantes')
  } else {
    // Los parametros no están completos
    var usuario = buscarUsuario(req.body.id)
    if (usuario != null) {
      // No se encontro el usuario
      respuesta = {
        error: true,
        codigo: 503,
        mensaje: 'El usuario ya fue creado previamente'
      }
      console.log('[POSTUSER] Error: el usuario ya fue creado previamente')
    } else {
      // Se encontró el usuario
      usuario = {
        id: req.body.id,
        name: req.body.name,
        piloto: null,
        destino: null
      }
      // Guardarlo en el arreglo
      users.push(usuario)
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario creado',
        respuesta: usuario
      }
      console.log('[POSTUSER] El usuario ' + usuario.id + ' fue creado')
    }
  }
  res.send(respuesta)
})

// Router para borrar un usuario
app.delete('/user', function (req, res) {
  var id = req.query.id
  if (id != null) {
    // Si viene el parametro id
    var usuario = buscarUsuario(id)
    if (usuario == null) {
      // No se encontró el usuario
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
      }
      console.log('[DELETEUSER] Error: El usuario no ha sido creado')
    } else {
      // Se encontró el usuario
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario eliminado'
      }
      console.log('[DELETEUSER] Usuario ' + usuario.id + ' eliminado')
      // Eliminar el usuario del arreglo
      users.splice(users.indexOf(usuario), 1)
    }
  }
  res.send(respuesta)
})

// Router para asginar un viaje
app.post('/userviaje', function (req, res) {
  var id = req.query.id
  var piloto = req.query.piloto
  var destino = req.query.destino
  if (id != null) {
    // Si viene el parametro id
    var r = asignarViaje(id, piloto, destino)
    if (r) { // Si el viaje se asigno correctamente
      console.log('[USERVIAJE] Se asigno el viaje para el usuario ' + id + ' con el piloto ' + piloto + ' hacia el destino: ' + destino)
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Viaje asignado'
      }
    } else { // Hubo error en la asignación
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'Error al asignar el viaje'
      }
      console.log('[USERVIAJE] Error al asginar el viaje para el usuario ' + id + ' con el piloto ' + piloto + ' hacia el destino: ' + destino)
    }
  }
  res.send(respuesta)
})

// Router para desasignar un viaje
app.delete('/userviaje', function (req, res) {
  var id = req.query.id
  if (id != null) { // El parámetro id esta presente
    var r = terminarViaje(id)
    console.log(r)
    if (r != null) { // Se logro la desasignacion del viaje
      console.log('[USERVIAJE] Se termino el viaje para el usuario ' + id)
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Viaje terminado',
        respuesta: { usuario: id, piloto: r }
      }
    } else { // Hubo error en la desasignacion
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'Error al desasignar el viaje'
      }
      console.log('[USERVIAJE] Error al terminar el viaje')
    }
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

// Creacion del servidor en el puerto 8001
http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001')
})
