import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private bancoService: BancoService) { }

  ngOnInit(): void {
  }

  async loginGestor(
    usuarioInput: HTMLInputElement,
    passwordInput: HTMLInputElement) {

    const usuario = usuarioInput.value;
    const password = passwordInput.value;

    const ok = await this.bancoService.loginGestor(
      usuario, password);

    // si ok es true, entonces la autenticación ha sido correcta
    // if (ok) {
    //   alert('Autenticación correcta');
    // } else {
    //   alert('Autenticación incorrecta');
    // }

    const msg = (ok) ?
      'Autenticación correcta' : 'Autenticación incorrecta';

    alert(msg);
  }

}
