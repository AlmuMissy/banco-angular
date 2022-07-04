import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { GestoresComponent } from './components/gestores/gestores.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    ChatComponent,
    LoginClienteComponent,
    NoEncontradoComponent,
    GestoresComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
