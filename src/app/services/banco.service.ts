import { Injectable } from '@angular/core';
import { Respuesta } from '../modelos/respuesta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private authService: AuthService) { }

  async loginGestor(
    usuario: string,
    password: string): Promise<boolean> {

    const response = await fetch(
      'http://127.0.0.1:8085/login/gestor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `usuario=${usuario}&password=${password}`
      }
    );

    const datos: Respuesta = await response.json();

    // si la autenticación ha sido exitosa, invocamos al método autenticado del servicio auth
    if(datos.ok) {
      this.authService.autenticado(datos.data.token, usuario,'gestor' )
    }

    return datos.ok;
  }

  async loginCliente(
    usuario: string,
    password: string): Promise<boolean> {

    const response = await fetch(
      'http://127.0.0.1:8085/login/cliente/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `usuario=${usuario}&password=${password}`
      }
    );

    const datos: Respuesta = await response.json();
    if(datos.ok) {
      this.authService.autenticado(datos.data.token, usuario,'cliente' )
    }
    return datos.ok;
  }

}
