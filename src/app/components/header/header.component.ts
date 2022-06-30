import { Component, OnInit } from '@angular/core';
import { obtenerLocalizacion } from '../../modelos/geolocalizacion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  reloj!: string;
  minutosRestantes!: number;

  constructor() { }

  ngOnInit(): void {

    this.actualizarReloj();
    this.actualizarMinutosRestantes();

    // el callback se ejecuta cada segundo
    setInterval(() => {
      this.actualizarReloj();
      this.actualizarMinutosRestantes();
    }, 1000);
  }

  actualizarReloj() {
    const fechaActual = new Date();

    // añadir el 0 a la izquierda cuando los minutos están entre 0-9
    let minutos = fechaActual.getMinutes().toString();
    if(minutos.length === 1) {
      minutos = '0' + minutos;
    }

    // añadir el 0 a la izquierda cuando los segundos están entre 0-9
    let segundos = fechaActual.getSeconds().toString();
    if(segundos.length === 1) {
      segundos = '0' + segundos;
    }

    this.reloj = `${fechaActual.getHours()}:${minutos}:${segundos}`
  }

  actualizarMinutosRestantes() {

    const fechaActual = new Date();

    const fechaSalidaClase = new Date();
    fechaSalidaClase.setHours(20,25);

    const diffMilisegundos = fechaSalidaClase.getTime() - fechaActual.getTime();
    this.minutosRestantes = Math.round(diffMilisegundos / 1000 / 60);
  
  }

  actualizarTemperatura() {
    obtenerLocalizacion((latitud: number, longitud: number) => {
      console.log(latitud, longitud);
    });
  }
}
