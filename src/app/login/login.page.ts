import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonIcon, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonInput, 
  IonButton,
  MenuController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { leafOutline, mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonIcon, 
    IonCard, 
    IonCardContent, 
    IonItem, 
    IonInput, 
    IonButton
  ]
})
export class LoginPage {
  // Estado para alternar pestañas
  profileType: 'iniciarSesion' | 'crearCuenta' = 'iniciarSesion';

  // Modelos de datos
  strnombreUsuario: string = '';
  strcorreoUsuario: string = '';
  strcontrasena: string = '';

  constructor(
    private menuCtrl: MenuController, 
    private router: Router
  ) {
    addIcons({ leafOutline, mailOutline, lockClosedOutline, personOutline });
  }

  // Ocultar menú lateral al entrar a la pantalla de Login
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  // Volver a habilitar el menú lateral al salir del Login
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  // Maneja la acción según la pestaña activa
  procesarFormulario() {
    if (this.profileType === 'iniciarSesion') {
      this.iniciarSesion();
    } else {
      this.crearCuenta();
    }
  }

  iniciarSesion() {
    console.log('Correo ingresado:', this.strcorreoUsuario);
    console.log('Contraseña ingresada:', this.strcontrasena);

    // Redirección a la vista principal
    this.router.navigate(['/folder', 'Zona de Cultivo']);
  }

  crearCuenta() {
    console.log('Nombre ingresado:', this.strnombreUsuario);
    console.log('Correo ingresado:', this.strcorreoUsuario);
    console.log('Contraseña ingresada:', this.strcontrasena);

    // Lógica para crear cuenta y posteriormente navegar
    this.router.navigate(['/folder', 'Zona de Cultivo']);
  }
}