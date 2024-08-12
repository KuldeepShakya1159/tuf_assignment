const { Client } = require('pg');

const query = async (squery) => {
    const client = new Client({
        host: 'localhost',
        user: 'banner',
        port: 5432,
        password: '1234',
        database: 'banner'
    });

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
