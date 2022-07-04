import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  estaAutenticado: boolean = false;

  constructor(
    private bancoService: BancoService,
    private router: Router,  // este objeto nos permite realizar redirecciones
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    // si el usuario está autenticado (el token está almacenado en el localStorage), entonces se realiza una redirección a /chat
    if(this.authService.estaAutenticadoGestor()) {
      this.router.navigate(['chat']);
    }
  }

  async loginGestor(
    usuarioInput: HTMLInputElement,
    passwordInput: HTMLInputElement) {

    const usuario = usuarioInput.value;
    const password = passwordInput.value;

    const ok = await this.bancoService.loginGestor(
      usuario, password);

    // si ok es true, entonces la autenticación ha sido correcta y no se muestra la caja de texto del mensaje (this.estaAutenticado = false)
    // si ok es false, entonces la autenticación ha sido incorrecta y sí  se muestra la caja de texto del mensaje (this.estaAutenticado = true)
    this.estaAutenticado = !ok;

    // esperamos 5 segundos antes de ocultar la caja del mensaje
    setTimeout(() => {
      this.estaAutenticado = false;
    }, 5000);

    // Si la autenticación es incorrecta, vaciar el campo de texto del password
    if(ok === false) {
      passwordInput.value = '';
    }

    // si la autenticación es correcta, entonces redireccionamos a lar ruta /chat
    else {
      this.router.navigate(['chat']);
    }
  }

  loginGestorEnter(
    event: KeyboardEvent,
    usuarioInput: HTMLInputElement,
    passwordInput: HTMLInputElement
  ) {

    // el usuario ha pulsado Enter en la caja de texto del password. Ahora ejecutamos el mismo código del método loginGestor
    if(event.key === 'Enter') {
      this.loginGestor(usuarioInput, passwordInput);
    }
  }

}
