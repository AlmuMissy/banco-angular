import { Component, OnInit } from '@angular/core';
import { obtenerLocalizacion } from '../../utilidades/geolocalizacion';
import { TiempoService } from '../../services/tiempo.service';
import { CriptomonedaService } from '../../services/criptomoneda.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaGestorAutenticado: boolean = false;
  estaClienteAutenticado: boolean = false;

  reloj!: string;
  minutosRestantes!: number;
  temperatura!: number;
  ciudad!: string;
  precioBitcoin!: number;

  constructor(
    private tiempoService: TiempoService,
    private criptomonedaService: CriptomonedaService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.estaGestorAutenticado = this.authService.estaAutenticadoGestor();
    this.authService.cambiosAutenticacionGestor.subscribe(autenticado => {
      this.estaGestorAutenticado = autenticado;
    })

    this.actualizarReloj();
    this.actualizarMinutosRestantes();
    this.actualizarTemperatura();
    this.actualizarPrecioBitcoin();

    // el callback se ejecuta cada segundo
    setInterval(() => {
      this.actualizarReloj();
      this.actualizarMinutosRestantes();
    }, 1000);
  }


  obtenerUsuarioAutenticado(): string | null {
    return localStorage.getItem('usuario');
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
    fechaSalidaClase.setHours(20, 30, 0);

    const diffMilisegundos = fechaSalidaClase.getTime() - fechaActual.getTime();
    this.minutosRestantes = Math.round(diffMilisegundos / 1000 / 60);
  }

  actualizarTemperatura() {
    obtenerLocalizacion(async (latitud: number, longitud: number) => {
      const datos = await this.tiempoService.obtenerTiempo(longitud, latitud);
      this.temperatura = datos.data[0].temp;
      this.ciudad = datos.data[0].city_name;
    });
  }

  actualizarPrecioBitcoin() {
    this.criptomonedaService.obtenerPrecioBitcoin((precioBitcoin: number) => {
      this.precioBitcoin = precioBitcoin;
    });
  }

  onLogout() {
    this.authService.desautenticado();
    //esto redirecciona a la url /login/gestor
    this.router.navigate(['login', 'gestor']);
  }
}
