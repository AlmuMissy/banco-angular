import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {

  estaAutenticado: boolean = false;

  constructor(private bancoService: BancoService) { }

  ngOnInit(): void {
  }

  async loginCliente(
    usuarioInput: HTMLInputElement,
    passwordInput: HTMLInputElement) {

    const usuario = usuarioInput.value;
    const password = passwordInput.value;

    const ok = await this.bancoService.loginCliente(
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

    // si ok es true, entonces la autenticación ha sido correcta
    // if (ok) {
    //   alert('Autenticación correcta');
    // } else {
    //   alert('Autenticación incorrecta');
    // }

    // const msg = (ok) ?
    //   'Autenticación correcta' : 'Autenticación incorrecta';

    // alert(msg);
  }

  loginClienteEnter(
    event: KeyboardEvent,
    usuarioInput: HTMLInputElement,
    passwordInput: HTMLInputElement
  ) {

    // el usuario ha pulsado Enter en la caja de texto del password. Ahora ejecutamos el mismo código del método loginCliente
    if(event.key === 'Enter') {
      this.loginCliente(usuarioInput, passwordInput);
    }
  }
}
