import mysql from 'mysql2';

// mysql.connect(process.env.MYSQL_URI)

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, // reemplazar con el puerto de la base de datos
    user: 'root', // reemplazar con el usuario de la base de datos
    password: 'Proyectoayds3PAC.', // contraseña del usuario de la base de datos
    database: 'Proy_AyDS', // reemplazar con el nombre de la base de datos
});

connection.connect((error) => {

    if (error) {
        throw new Error('El error de conexión es: ', error);
    }
    console.log('¡Conexión exitosa!');
});

export default connection;