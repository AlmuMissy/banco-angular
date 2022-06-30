import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  private usuario!: string;

  //este atributo solo debería tomar dos valores: gestor o cliente
  private tipoUsuario!: "gestor" | "cliente";
  private fechaLogin!: Date;



  constructor() { }

  autenticado(token: string, usuario:string, tipoUsuario:"gestor" | "cliente"){
    this.token= token;
    this.usuario=usuario;
    this.tipoUsuario= tipoUsuario;
    this.fechaLogin= new Date();
  }

  desautenticado(){
    this.token= '';
    this.usuario='';
  }
}
