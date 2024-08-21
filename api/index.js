const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middleware/error.handler')

const app = express();
const port = process.env.PORT || 3000;

//Para que podamos recibir post con JSON
app.use(express.json());

//Para habiliatr a cualquier dominio cnectarse a la API
app.use(cors());

//Para habilitar acceso a la API solo algunos dominios
// const whitelist = ['http://localhost:8080', 'http://myapp.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('No permitido por CORS'));
//     }
//   }
// }
//lol
app.get('/api', (req, res) => {
  res.send('Hola , este es mi RESTful API con Express!');
});



routerApi(app);

//Middleware de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => {
  console.log('Mi port es: ' + port);
});


