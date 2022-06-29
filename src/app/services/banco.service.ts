import { Injectable, Type } from '@angular/core';
import { Respuesta } from '../modelos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor() { }

  async loginGestor(usuario: string, password: string):Promise<boolean> {

    const response = await fetch(
      'http://127.0.0.1:8085/login/gestor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `usuario=${usuario}&password=${password}`
      }
    );

    const datos:Respuesta = await response.json();
    return datos.ok;

  }
}
