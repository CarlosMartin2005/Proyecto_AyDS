import mysql from 'mysql2';
import 'dotenv/config';

// mysql.connect(process.env.MYSQL_URI)

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});

connection.connect((error) => {

    if (error) {
        throw new Error('El error de conexión es: ', error);
    }
    console.log('¡Conexión exitosa!');
});

export default connection;