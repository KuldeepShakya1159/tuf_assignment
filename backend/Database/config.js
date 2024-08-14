const { Client } = require('pg');
const fs = require('fs');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca:fs.readFileSync("./ca.pem").toString(),
    },
};


const query = async (squery) => {
    const client = new Client(config);
    console.log('Connected to PostgreSQL');
    try {
        await client.connect(); 
        const res = await client.query(squery); 
        return res.rows; 
    } catch (err) {
        console.error('Error executing query', err.stack); 
        throw err;
    } finally {
        await client.end();
    }
};

module.exports = {
    query
};
