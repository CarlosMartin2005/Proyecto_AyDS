import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateadorService {

  constructor() { }

  /**
   * Convierte una cadena de fecha y hora MySQL a un formato web estándar.
   *
   * @param {string} fechaMySQL - La cadena de fecha y hora en formato MySQL (2000-01-01T06:00:00.000Z).
   * @returns {string[]} Un array que contiene la cadena de fecha formateada y sus componentes:
   * - Formatted date string in DD/MM/YYYY HH:MM format.
   * - Year (YYYY).
   * - Month (MM).
   * - Day (DD).
   * - Hours (HH).
   * - Minutes (MM).
   * - Date string in YYYY-MM-DD format.
   */
  convertirFechaMySQLaStandarWeb(fechaMySQL: string) {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaMySQL);

    // Obtener los componentes de la fecha
    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const anio = fecha.getUTCFullYear();

    // Obtener los componentes de la hora
    const horas = String(fecha.getUTCHours()).padStart(2, '0');
    const minutos = String(fecha.getUTCMinutes()).padStart(2, '0');

    // Formatear la fecha y la hora
    const fechaFormateada = `${dia}-${mes}-${anio} ${horas}:${minutos}`;
    const SoloFecha = `${anio}-${mes}-${dia}`;

    const arrayFecha = [fechaFormateada, anio, mes, dia, horas, minutos, SoloFecha];

    return arrayFecha;
  }

  /**
   * Calcula la edad en función de la cadena de fecha de nacimiento dada.
   *
   * @param fechaNacimiento - La fecha de nacimiento en formato string, se espera que sea en formato MySQL date (2000-01-01T06:00:00.000Z).
   * @returns La edad calculada en años.
   */
  calcularEdad(fechaNacimiento: string) {
    const fecha = this.convertirFechaMySQLaStandarWeb(fechaNacimiento);
    const fechaFormateada = fecha[3] + '/' + fecha[2] + '/' + fecha[1];
    const fechaNacimientoFINAL = new Date(fechaFormateada);
    const hoy = new Date();

    const diff = hoy.getTime() - fechaNacimientoFINAL.getTime();
    const edad = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    return edad;
  }
}
