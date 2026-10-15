import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, 
  IonCard, IonCardContent, IonItem, IonInput, IonButton, 
  MenuController, ToastController 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { leafOutline, mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, 
    IonToolbar, IonIcon, IonCard, IonCardContent, IonItem, 
    IonInput, IonButton
  ]
})
export class LoginPage {
  profileType: 'iniciarSesion' | 'crearCuenta' = 'iniciarSesion';

  strnombreUsuario: string = '';
  strcorreoUsuario: string = '';
  strcontrasena: string = '';

  constructor(
    private menuCtrl: MenuController, 
    private router: Router,
    private apiService: ApiService,
    private toastCtrl: ToastController
  ) {
    addIcons({ leafOutline, mailOutline, lockClosedOutline, personOutline });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  procesarFormulario() {
    if (this.profileType === 'iniciarSesion') {
      this.iniciarSesion();
    } else {
      this.crearCuenta();
    }
  }

  iniciarSesion() {
    if (!this.strcorreoUsuario || !this.strcontrasena) {
      this.mostrarToast('Por favor completa todos los campos', 'danger');
      return;
    }

    this.apiService.getUsers().subscribe({
      next: (res: any) => {
        const usuarios = res.Respuesta || [];
        const usuarioValido = usuarios.find(
          (u: any) => u.strcorreoUsuario === this.strcorreoUsuario && u.strcontrasena === this.strcontrasena
        );

        if (usuarioValido) {
          localStorage.setItem('userSession', JSON.stringify(usuarioValido));
          this.mostrarToast('¡Bienvenido!', 'success');
          this.router.navigate(['/folder', 'Zona de Cultivo']);
        } else {
          this.mostrarToast('Credenciales incorrectas', 'danger');
        }
      },
      error: () => this.mostrarToast('Error al conectar con la base de datos', 'danger')
    });
  }

  crearCuenta() {
    if (!this.strnombreUsuario || !this.strcorreoUsuario || !this.strcontrasena) {
      this.mostrarToast('Por favor completa todos los campos', 'danger');
      return;
    }

    const nuevoUsuario = {
      strnombreUsuario: this.strnombreUsuario,
      strcorreoUsuario: this.strcorreoUsuario,
      strcontrasena: this.strcontrasena,
      strwebsite: ''
    };

    this.apiService.insertUser(nuevoUsuario).subscribe({
      next: (res: any) => {
        this.mostrarToast('Cuenta creada con éxito', 'success');
        this.profileType = 'iniciarSesion';
      },
      error: () => this.mostrarToast('Error al registrar usuario en la BD', 'danger')
    });
  }

  private async mostrarToast(mensaje: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}