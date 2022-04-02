const express = require('express');
const apiController = require('./controllers/api-controller');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes/api');
app.use('/api', routes);

app.use('/', apiController.mostrarDoc);


app.listen(process.env.port || 8081, () =>{
   console.log('Servidor em execução na porta: '+ 8081);
});

console.log('Server running at http://127.0.0.1:8081/');

