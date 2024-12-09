import connection from '../../db/connection.js';
import conexion from '../../db/conexion.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { validateRegister } from './../../schemas/auth.schema.js';
import bcrypt from "bcrypt";

export class DocentesController {

  static getDocentes(req, res) {
    const query = `
        SELECT 
          u.id AS docente_id, 
          u.nombre AS docente_nombre, 
          u.apellido AS docente_apellido, 
          u.status AS docente_status, 
          u.email AS docente_email, 
          u.fecha_nacimiento AS docente_fecha_nacimiento, 
          u.numeroCuenta AS docente_numeroCuenta, 
          u.identidad AS docente_identidad, 
          u.fecha_creacion AS docente_fecha_creacion, 
          u.fecha_actualizacion AS docente_fecha_actualizacion, 
          d.especialidad AS docente_especialidad,
          d.telefono AS docente_telefono,
          d.direccion AS docente_direccion,
          c.id AS curso_id,
          c.nombre AS curso_nombre,
          c.descripcion AS curso_descripcion,
          c.horario AS curso_horario,
          c.fecha_creacion AS curso_fecha_creacion,
          c.fecha_fin AS curso_fecha_actualizacion

        FROM
            usuarios u
        LEFT JOIN
            docentes d ON u.id = d.id_usuario
        LEFT JOIN
            cursos c ON u.id = c.docente_id
        WHERE
            u.rol = 'docente'
        ORDER BY
            u.id;
        `
    try {
      connection.query(query, (error, results) => {

        if (error) {
          return res.status(400).json({
            error: true,
            message: "Ocurrió un error al obtener los datos: " + error
          })
        }

        const docentesMap = new Map();

        results.forEach(row => {
          const {
            docente_id, docente_nombre, docente_apellido, docente_email, docente_fecha_creacion, docente_fecha_actualizacion, docente_especialidad,
            curso_id, curso_nombre, curso_descripcion, curso_fecha_creacion, curso_fecha_actualizacion, docente_status, curso_horario, docente_numeroCuenta, docente_identidad, docente_fecha_nacimiento,
            docente_telefono, docente_direccion
          } = row;

          if (!docentesMap.has(docente_id)) {
            docentesMap.set(docente_id, {
              id: docente_id,
              nombre: docente_nombre,
              apellido: docente_apellido,
              email: docente_email,
              status: docente_status,
              numeroCuenta: docente_numeroCuenta,
              identidad: docente_identidad,
              telefono: docente_telefono,
              direccion: docente_direccion,
              fechaNacimiento: docente_fecha_nacimiento,
              fechaCreacion: docente_fecha_creacion,
              ultimaActualizacion: docente_fecha_actualizacion,
              especialidad: docente_especialidad,
              cursos: []
            });
          }

          if (curso_id) {
            docentesMap.get(docente_id).cursos.push({
              id: curso_id,
              nombre: curso_nombre,
              descripcion: curso_descripcion,
              horario: curso_horario,
              fechaCreacion: curso_fecha_creacion,
              ultimaActualizacion: curso_fecha_actualizacion
            });
          }
        });

        const docentes = Array.from(docentesMap.values());

        return res.status(200).json(docentes);
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: "Ocurrió un error al obtener los datos: " + error
      })
    }

  }

  static async addDocente(req, res) {
    const { nombre, apellido, email, password, especialidad, telefono, direccion, identidad, fechaNacimiento, status } = req.body;

    if (!nombre || !apellido || !email || !password || !especialidad || !telefono || !direccion || !identidad || !fechaNacimiento || !status) {
      return res.status(400).json({
        error: true,
        message: "Todos los campos son obligatorios"
      });
    }

    const { error } = validateRegister({ nombre, apellido, email, password, especialidad, telefono, direccion, identidad, fechaNacimiento });
    const statusFinal = status === 'Activo' ? 'A' : 'I';

    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.errors[0].message
      });
    }

    const queryEmail = `
        SELECT
            email
        FROM
            usuarios
        WHERE
            email = ?;
        `;
    const queryIdentidad = `
        SELECT
            identidad
        FROM
            usuarios
        WHERE
            identidad = ?;  
        `;

    const queryNumeroCuenta = `
        SELECT
            numeroCuenta
        FROM
            usuarios
        WHERE
            numeroCuenta = ?;
        `;

    const queryUsuarios = `
        INSERT INTO usuarios (id, nombre, apellido, email, password_hash, rol, status, fecha_nacimiento, numeroCuenta, identidad, fecha_creacion, fecha_actualizacion)
        VALUES (?,
                ?,
                ?,
                ?,
                ?,
                'docente',
                ?,
                ?,
                ?,
                ?,
                NOW(),
                NOW());
        `;
    const queryDocentes = `
        INSERT INTO docentes (id_usuario, especialidad, telefono, direccion)
        VALUES (?, ?, ?, ?);
        `;

    // numero de cuenta tendra el formato de:
    // la primera letras del nombre + la primera letras del apellido + los primeros 4 digitos de la identidad + el año actual + los ultimos 4 digitos de la identidad
    const numeroCuenta = nombre.charAt(0) + apellido.charAt(0) + identidad.slice(0, 4) + new Date().getFullYear() + identidad.slice(-4);
    const id = uuidv4();
    const password_hash = bcrypt.hashSync(password, 10);
    const connectionPromise = await conexion.getConnection();
    await connectionPromise.beginTransaction();
    try {
      // Verificar si el email ya existe



      const [rowsEmail] = await connectionPromise.query(queryEmail, [email]);
      const [rowsIdentidad] = await connectionPromise.query(queryIdentidad, [identidad]);
      const [rowsNumeroCuenta] = await connectionPromise.query(queryNumeroCuenta, [numeroCuenta]);

      if (rowsEmail.length > 0) {
        return res.status(400).json({
          error: true,
          message: "El email ya existe"
        });
      }

      if (rowsIdentidad.length > 0) {
        return res.status(400).json({
          error: true,
          message: "La identidad ya existe"
        });
      }

      if (rowsNumeroCuenta.length > 0) {
        return res.status(400).json({
          error: true,
          message: "El número de cuenta ya existe"
        });
      }

      await connectionPromise.query(queryUsuarios, [id, nombre, apellido, email, password_hash, statusFinal, fechaNacimiento, numeroCuenta, identidad]);
      await connectionPromise.query(queryDocentes, [id, especialidad, telefono, direccion]);

      await connectionPromise.commit();
      connectionPromise.release();

      return res.status(200).json({
        message: "Docente agregado correctamente"
      });
    }
    catch (error) {
      await connectionPromise.rollback();
      return res.status(400).json({
        error: true,
        message: "Ocurrió un error al agregar el docente: " + error
      });
    }
  }

  static async editDocente(req, res) {
    const { id, nombre, apellido, email, especialidad, telefono, direccion, identidad, fechaNacimiento, status } = req.body;

    if (!id || !nombre || !apellido || !email || !especialidad || !telefono || !direccion || !identidad || !fechaNacimiento || !status) {
      return res.status(400).json({
        error: true,
        message: "Todos los campos son obligatorios"
      });
    }

    // const { error } = validateRegister({ nombre, apellido, email, especialidad, telefono, direccion, identidad, fechaNacimiento });
    const statusFinal = status === 'Activo' ? 'A' : 'I';

    // if (error) {
    //   return res.status(400).json({
    //     error: true,
    //     message: 'Ocurrió un error al editar el docente: ' + error.errors[0].message
    //   });
    // }

    const queryEmail = `
        SELECT
            email
        FROM
            usuarios
        WHERE
            email = ? AND id != ?;
        `;
    const queryIdentidad = `  
        SELECT
            identidad
        FROM
            usuarios
        WHERE
            identidad = ? AND id != ?;
        `;

    const queryUsuarios = `
        UPDATE usuarios
        SET nombre = ?,
            apellido = ?,
            email = ?,
            status = ?,
            fecha_nacimiento = ?,
            identidad = ?,
            fecha_actualizacion = NOW()
        WHERE id = ?;
        `;

    const queryDocentes = `
        UPDATE docentes
        SET especialidad = ?,
            telefono = ?,
            direccion = ?
        WHERE id_usuario = ?;
        `;

    const connectionPromise = await conexion.getConnection();
    await connectionPromise.beginTransaction();

    try {
      const [rowsEmail] = await connectionPromise.query(queryEmail, [email, id]);
      const [rowsIdentidad] = await connectionPromise.query(queryIdentidad, [identidad, id]);

      if (rowsEmail.length > 0) {
        return res.status(400).json({
          error: true,
          message: "El email ya existe"
        });
      }

      if (rowsIdentidad.length > 0) {
        return res.status(400).json({
          error: true,
          message: "La identidad ya existe"
        });
      }


      await connectionPromise.query(queryUsuarios, [nombre, apellido, email, statusFinal, fechaNacimiento, identidad, id]);
      await connectionPromise.query(queryDocentes, [especialidad, telefono, direccion, id]);

      await connectionPromise.commit();

      return res.status(200).json({
        message: "Docente editado correctamente"
      });

    } catch (error) {
      await connectionPromise.rollback();
      return res.status(400).json({
        error: true,
        message: "Ocurrió un error al editar el docente: " + error
      });
    }
  }

  static async deleteDocente(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "El campo 'id' es obligatorio"
      });
    }

    const queryUsuarios = `
        DELETE FROM usuarios
        WHERE id = ?;
        `;
    const queryDocentes = `
        DELETE FROM docentes
        WHERE id_usuario = ?;
        `;
    const connectionPromise = await conexion.getConnection();
    await connectionPromise.beginTransaction();
    try {
      await connectionPromise.query(queryUsuarios, [id]);
      await connectionPromise.query(queryDocentes, [id]);

      await connectionPromise.commit();
      connectionPromise.release();

      return res.status(200).json({
        message: "Docente eliminado correctamente"
      });
    } catch (error) {
      await connectionPromise.rollback();
      return res.status(400).json({
        error: true,
        message: "Ocurrió un error al eliminar el docente: " + error
      });
    }
  }

}