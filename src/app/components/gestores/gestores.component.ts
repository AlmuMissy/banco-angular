import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { Gestor } from '../../modelos/gestor';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  gestores: Gestor[] = [];

  constructor(
    private bancoService: BancoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // comprueba que el gestor esté autenticado. Si NO lo está, redirigir a /login/gestor
    if(!this.authService.estaAutenticadoGestor()) {
      this.router.navigate(['login', 'gestor']);
    }

    // esto solamente se debería de ejecutar cuando el gestor está autenticado
    setInterval(() => {
      this.obtenerGestoresDelServicio();
    }, 1000);

  }

  async obtenerGestoresDelServicio() {
    this.gestores = await this.bancoService.obtenerGestores();
  }

  async onEliminarGestor(id: number) {

    const confirmarBorrar = confirm('¿Seguro que quiere eliminar el gestor?');
    // si confirmarBorra es false, entonces el usuario ha pulsado de Cancelar
    if(!confirmarBorrar) {
      return;
    }

    // borra el gestor
    const ok = await this.bancoService.eliminarGestor(id);
    if(ok) {
      this.gestores = this.gestores.filter(gestor => gestor.id !== id);
    }
  }

  // este método se ejecuta cuando el usuario pulsa sobre el botón Insertar
  async onAgregarGestor(
    usuarioInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    emailInput: HTMLInputElement
  ) {

    const usuario = usuarioInput.value;
    const password = passwordInput.value;
    const correo = emailInput.value;

    const msg = await this.bancoService.agregarGestor({
      usuario: usuario,
      password: password,
      correo: correo
    } as Gestor);

    // si el mensaje tiene una longitud mayor que 0, entonces se ha producido un error. Muestro el error pantalla mediante un alert y finalizao el método
    if(msg.length > 0) {
      alert(msg);
      return;
    }

    // obtener el id del nuevo gestor introducido
    const gestor = await this.bancoService.obtenerGestor(usuario);
    const id = gestor.id;

    // el gestor se ha introducido correctamente (msg.length === 0)
    this.gestores.push({
      id, usuario, password, correo
    } as Gestor)

    // borrar todo el contenido de los tres campos de formulario
    usuarioInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';

    // console.log(usuario, password, correo);

  }
}
