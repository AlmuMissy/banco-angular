import { Injectable } from '@angular/core';
import { RespuestaTiempo } from '../modelos/respuesta-tiempo';

@Injectable({
  providedIn: 'root'
})
export class TiempoService {

  constructor() { }

  obtenerTiempo(longitud: number, latitud: number): Promise<RespuestaTiempo> {

    return new Promise(async (resolve, reject) => {

      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?key=f86cc28da74b470ab1638296835dcee5&lat=${latitud}&lon=${longitud}`, {
          method: 'GET'
        }
      );

      const datos: RespuestaTiempo = await response.json();
      resolve(datos);
    });
  }
}
