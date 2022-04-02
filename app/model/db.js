
async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const server = process.env.DATABASE_SERVICE_NAME;
    const user = process.env.POSTGRESQL_USER;
    const pass = process.env.POSTGRESQL_PASSWORD;
    const databaseName = process.env.POSTGRESQL_DATABASE;

    const connectionString = `postgres://${user}:${encodeURIComponent(pass)}@${server}:5432/${databaseName}`;

    const { Pool } = require('pg');
    const pool = new Pool({
        "connectionString": connectionString
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function selectClientes() {
    const client = await connect();
    const res = await client.query('SELECT * FROM clientes order by id');
    return res.rows;
}

async function selectClienteById(id) {
    const client = await connect();
    const res = await client.query('SELECT * FROM clientes where id=$1', [id]);
    return res.rows;
}

async function insertCliente(customer){
    console.log('passei aqui');
    console.log('teste: ' + customer);
    const client = await connect();
    const sql = 'INSERT INTO clientes(nome,idade,uf) VALUES ($1,$2,$3);';
    const values = [customer.nome, customer.idade, customer.uf];
    return await client.query(sql, values);
}

async function updateCliente(customer){
    const client = await connect();
    const sql = 'UPDATE  clientes SET nome = $1, idade=$2, uf=$3 WHERE id=$4;';
    const values = [customer.nome, customer.idade, customer.uf, customer.id];
    return await client.query(sql, values);
}

async function deleteCliente(id){
    const client = await connect();
    const sql = 'delete from clientes WHERE id=$1;';
    return await client.query(sql, [id]);
}

async function createTable(){
    const client = await connect();
    const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
     id SERIAL CONSTRAINT pk_id_cliente PRIMARY KEY,
     nome varchar(150) NOT NULL, 
     idade integer NOT NULL,
     uf varchar(2) NOT NULL
    );`;
    return await client.query(sql);
}

(async () => {
    console.log('CREATE TABLE');
    await createTable();
 })(); 
 
module.exports = { selectClientes, insertCliente, selectClienteById, deleteCliente, updateCliente, createTable }
 
 