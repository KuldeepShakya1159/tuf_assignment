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
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUfbKRfPfMKtbNAJDffxbYd6PRrZQwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZmJlODczMzEtNzY4NS00YWVlLWE2MDAtZmU0ZjU5M2M0
MjI3IFByb2plY3QgQ0EwHhcNMjQwODE0MDg1MTIxWhcNMzQwODEyMDg1MTIxWjA6
MTgwNgYDVQQDDC9mYmU4NzMzMS03Njg1LTRhZWUtYTYwMC1mZTRmNTkzYzQyMjcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIkUB20s
4iUwF+9KR8ZNuISt9uIXmxBrjiM8f3oCbXGNFh/YGGVK83asGzQseioortUvejE4
t94Ls2D5VNHPAkB6JokJ5w4x2UzqNcx+DHqclLuIMMkrCbIqEhdaakDvHhGqs85U
y3KVkwJwF0EqN3kcxVMqN5ls2zAYeEK2s1rKmoAD30/yIKFRfA4z47Z9cnX5aXkv
tadLVitT0egxo31xCEJfiTmFFjkPLjc/ARVryT9M2y0DFfkcYuIN14oBZV5+yveh
HF7O8NibkQQpwDEY9icZc51eYMuHkXxzBw9ciZr3VnQubu9doKk/A+EVPHNo1W8k
J7Kdi2AzH8nYHhZjBXwHWIlGSk44+DruAteKst0tN0qboubshuD6H2zCeACzPnBN
t39v0VoGLlPZC0IdfNZKlPHSzyYvWUwktgF1esiGiPzZVgiLFG/Kkrr1H1bcTtAX
PllSLWq4SyZ+dY7lRcjC1MAqGWuSjANGYf9eke1Gy9518Vn+ziEZXZqPQwIDAQAB
oz8wPTAdBgNVHQ4EFgQU66dJjboqvom07efeYkE2fCUrFbowDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBABsejwUNru2ufnPz
qY3jQ907vnmYgs1y47HgommUqlpGgphVY/WJqzNCMHXP1sZdGv7Sr70g18xsahv9
OdOcsi7v3WttJBzL6nHkX/b/D/bXcYAejP4uoijf7XDs3CKYYdepaZ0TIw5WyQAv
ME9CuUJkJ1IVrSVrpoAkcQfB5YO51nEIvia0XUd/eXxTh3VdqefMmXlrpNR65Mxe
WMD3kwxxf5GxY+WYLJu5cmh2+TF0t7za9HLxKuYeKuQba875lqG1zgcDJC4TFIat
CTmlbS/yAIgf/CQP9wlqGFQ3hd7soLqIr22W/7a/1AXo1YS1Us6l7yCjwCdOuM/7
fBhZ+KZi9fCgOwQsJx1FVQ5iOee64JoGMN6F6sPHKvopAy1u1iRuzlh36eHM4dcz
wJ4/yqPEKnimjnLT+GSQopE8DKNLq1qtDW6SP3Ue819OmYDGAlR9bTEZbkYb+xxq
Oygjy3sEjGLucpzGDV6pJNHu+ONNpI4Yoqy2QU9zHGygiIvD1g==
-----END CERTIFICATE-----`,
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
