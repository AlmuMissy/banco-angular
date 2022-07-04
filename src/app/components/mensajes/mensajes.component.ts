import { MensajeEnviado } from './../../modelos/mensaje-enviado';
import { Component, OnInit } from '@angular/core';
import { Gestor } from '../../modelos/gestor';
import { BancoService } from '../../services/banco.service';
import { MensajeRecibido } from '../../modelos/mensaje-recibido';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  gestores!: Gestor[];
  mensajesRecibidos: MensajeRecibido[] = [];

  constructor(private bancoService: BancoService) { }

  ngOnInit(): void {
    this.obtenerGestores();
    this.obtenerMensajesRecibidos();
  }

  async obtenerGestores() {
    this.gestores = await this.bancoService.obtenerGestores();

    const usuarioAutenticado = localStorage.getItem('usuario');

    this.gestores = this.gestores.filter(gestor =>
      gestor.usuario !== usuarioAutenticado)
  }

  async obtenerMensajesRecibidos() {
    this.mensajesRecibidos = await this.bancoService.obtenerMensajesRecibidos();

    for (const mensaje of this.mensajesRecibidos) {

      // cambio en la propiedad fecha
      const fecha = new Date(mensaje.fecha);
      mensaje.fecha = `${fecha.getHours()}:${fecha.getMinutes()}`

      // cambio en la propiedad usuario
      const gestor = await this.bancoService.obtenerGestor(mensaje.id_origen);
      mensaje.usuario = gestor.usuario;
    };

    console.log(this.mensajesRecibidos);

  }

  async onEnviarMensaje(
    gestorDestinoSelect: HTMLSelectElement,
    mensajeTextarea: HTMLTextAreaElement) {

      // console.log(gestorDestinoSelect.value);
      // console.log(mensajeTextarea.value);

      const idGestorDestino = +gestorDestinoSelect.value;
      const mensaje = mensajeTextarea.value;

      const msg = await this.bancoService.enviarMensaje({
        id_destino: idGestorDestino,
        texto: mensaje
      } as MensajeEnviado);

      // si el mensaje se ha enviado correctamente, borrar el contenido del textarea
      if(msg.length === 0) {
        mensajeTextarea.value = '';
      }


  }

}
