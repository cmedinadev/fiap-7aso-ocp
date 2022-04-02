const db = require('../model/db');
const showdown   = require('showdown');

exports.recuperarClientes = async function (req, res) {
    const clientes = await db.selectClientes();
    res.send(clientes);
};

exports.recuperarClienteById = async function (req, res) {
    const cliente = await db.selectClienteById(req.params.id);
    if (cliente.length == 0) {
        res.sendStatus(404);
        return;
    } 
    res.send(cliente[0]);
};

exports.incluirCliente = async function (req, res) {
    console.log('passei aqui 0');
    const cliente = req.body;
    await db.insertCliente(cliente); 
    res.sendStatus(201);
};

exports.alterarCliente = async function (req, res) {
    const cliente = req.body;
    await db.updateCliente(cliente); 
    res.sendStatus(204);
};

exports.excluirCliente = async function (req, res) {
    await db.deleteCliente(req.params.id); 
    res.sendStatus(204);
};

exports.mostrarDoc = function (req, res) {
    const html = 
    `<html>
    <head>
        <style>
            body { font-family: arial }
            pre { border-radius: 6px; background-color: #e1e1e1; border-color: #ccc; padding: 6px 10px 6px; overflow: auto}
        </style>
    </head>
    <body>
    <h4 id="testes">Testes</h4>
    <p>Para testar a aplicação podemos realizar chamadas CURL para os end-points dos serviços, conforme exemplos abaixos: </p>
    <p>POST /api/clientes - Criar um cliente</p>
    <pre><code>curl -X POST http://fiap-7aso-fiap-7aso-grupo-8.apps.na46.prod.nextcle.com/api/clientes -H 'Content-Type: application/json' -d '{"nome":"João Marcelo","idade":22, "uf":"RJ"}'
    </code></pre>
    <p>GET /api/clientes - Recuperar todos os clientes</p>
    <pre><code>curl http://fiap-7aso-fiap-7aso-grupo-8.apps.na46.prod.nextcle.com/api/clientes
    </code></pre>
    <p>GET /api/clientes/:id - Recuperar um cliente específico</p>
    <pre><code>curl http://fiap-7aso-fiap-7aso-grupo-8.apps.na46.prod.nextcle.com/api/clientes/1
    </code></pre>
    <p>PUT /api/clientes/:id - Alterar um cliente</p>
    <pre><code>curl -X PUT http://fiap-7aso-fiap-7aso-grupo-8.apps.na46.prod.nextcle.com/api/clientes -H 'Content-Type: application/json' -d '{"id": 1, "nome":"João Marcelo","idade":22, "uf":"RJ"}'
    </code></pre>
    <p>DELETE /api/clientes/:id - Excluir um cliente</p>
    <pre><code>curl -X DELETE http://fiap-7aso-fiap-7aso-grupo-8.apps.na46.prod.nextcle.com/api/clientes/1
    </code></pre>
    </body>
    </html>`

    res.set('Content-Type', 'text/html');
    res.send(html);

}