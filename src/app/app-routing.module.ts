import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';

const routes: Routes = [
  /* ruta raíz */
  { path: '', redirectTo: '/login/gestor', pathMatch: 'full' },
  { path: 'login/gestor', component: LoginComponent },
  { path: 'login/cliente', component: LoginClienteComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
