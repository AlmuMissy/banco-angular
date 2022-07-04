import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriptomonedaService {

  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin');

    this.ws.onopen = () => {
      console.log('Conexión establecida correctamente con Coincap');
    };
  }

  obtenerPrecioBitcoin(callback: Function) {
    this.ws.onmessage = (event) => {

      const respuesta: { bitcoin: string } = JSON.parse(event.data);
      const precioBitcoin = +respuesta.bitcoin;
      callback(precioBitcoin);
    };
  }
}
