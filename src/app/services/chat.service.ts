import { Injectable } from '@angular/core';
import { MensajeChat } from '../modelos/mensaje-chat';
import { esJSON } from '../utilidades/tipos';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private ws: WebSocket;

  constructor() {

    this.ws = new WebSocket('ws://192.168.1.128:8081');

    this.ws.onopen = () => {
      console.log('Conexión establecida correctamente');
      // this.ws.send('Hola, soy Alejandro');
    };
  }

  // callback es una función que recibe el parámetro mensaje de tipo string y no retorna nada
  escucharMensajes(callback: (mensaje: MensajeChat) => void): void {
    this.ws.onmessage = (event) => {

      // si el mensaje recibido no tienen formato JSON, ignoramos el mensaje
      if(!esJSON(event.data)) {
        return;
      }

      const mensajeChat: MensajeChat = JSON.parse(event.data);
      callback(mensajeChat);
      // console.log(`Datos recibidos: ${event.data}`);
    };
  }

  enviar(mensajeChat: MensajeChat) {
    this.ws.send(JSON.stringify(mensajeChat));
  }
}
