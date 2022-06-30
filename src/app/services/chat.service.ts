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
      //si no es JSON ignoramos el mensaje
      if(!esJSON(event.data)) {
        return;
        
      }

      const mensajeChat: MensajeChat = JSON.parse(event.data);
      callback(mensajeChat);
      // console.log(`Datos recibidos: ${event.data}`);
    };
  }
  //envía el mensaje al servicio websocket
  enviar(MensajeChat:MensajeChat){
    this.ws.send(JSON.stringify(MensajeChat));
  }
}
