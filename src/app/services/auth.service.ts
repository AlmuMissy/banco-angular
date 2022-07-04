import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private token!: string;
  // private usuario!: string;

  // este atributo solamente debería tomar dos valores: gestor o cliente
  // private tipoUsuario!: "gestor" | "cliente";
  private fechaLogin!: Date;

  cambiosAutenticacionGestor = new EventEmitter<boolean>();
  cambiosAutenticacionCliente = new EventEmitter<boolean>();

  constructor() { }

  // este método lo invoca el servicio banco.service.ts cuando la autenticación es correcta
  autenticado(token: string, usuario: string, tipoUsuario: "gestor" | "cliente") {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('tipoUsuario', tipoUsuario);
    this.fechaLogin = new Date();

    if(localStorage.getItem('tipoUsuario') === 'gestor') {
      this.cambiosAutenticacionGestor.emit(true);
    }
    else if(localStorage.getItem('tipoUsuario') === 'cliente') {
      this.cambiosAutenticacionCliente.emit(true);
    }
  }

  desautenticado() {
    localStorage.setItem('token', '');
    localStorage.setItem('usuario', '');

    if(localStorage.getItem('tipoUsuario') === 'gestor') {
      this.cambiosAutenticacionGestor.emit(false);
    }
    else if(localStorage.getItem('tipoUsuario') === 'cliente') {
      this.cambiosAutenticacionCliente.emit(false);
    }
  }

  estaAutenticadoGestor(): boolean {
    return ((localStorage.getItem('token')) && (localStorage.getItem('tipoUsuario') === 'gestor'))
      ? true : false;
  }

  estaAutenticadoCliente(): boolean {
    return ((localStorage.getItem('token')) && (localStorage.getItem('tipoUsuario') === 'cliente'))
      ? true : false;
  }
}
