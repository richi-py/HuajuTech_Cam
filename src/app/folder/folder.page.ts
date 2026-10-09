import { Component, input, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonItem, IonCard, IonRange, IonCardContent, 
  RefresherCustomEvent, IonRefresher, IonRefresherContent, 
  IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
  IonIcon, IonCardHeader, IonCardTitle, IonList, IonLabel, 
  IonFab, IonFabButton, ActionSheetController 
}
from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  leafOutline, radioOutline, wifiOutline, playOutline, pauseOutline, 
  person, notificationsOutline, pencilOutline, trashOutline, addOutline, imageOutline,
  warningOutline, checkmarkCircleOutline, helpCircleOutline, 
  waterOutline, sunnyOutline, medkitOutline, layersOutline, 
  nutritionOutline, gitBranchOutline, searchOutline, 
  documentTextOutline, bookOutline, openOutline
} 
from 'ionicons/icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    IonItem, IonSpinner, IonButton, FormsModule, IonCardHeader, IonCardTitle, IonList, IonLabel, 
    IonFab, IonFabButton, IonIcon, IonCard, IonRange, IonCardContent, 
    IonRefresherContent, IonRefresher, IonHeader, IonToolbar, IonButtons, 
    IonMenuButton, IonTitle, IonContent
  ],
})
export class FolderPage {
  estado = "planta_en_mal_estado";
  readonly folder = input.required<string>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Datos del perfil
  profileImage: string | null = null; // null simula que la foto está vacía
  profileData = {
    name: null as string | null,
    email: null as string | null,
    website: null as string | null
  };

  // Estado de carga para el botón guardar
  isSaving: boolean = false;

  rows: number = 3;
  cols: number = 3;
  gridCells: any[] = [];
  loraConnected: boolean = true;
  connectedDevicesCount: number = 2;
  isPumpActive: boolean = false;

  

  constructor(private actionSheetCtrl: ActionSheetController) {
    addIcons({
      'leaf-outline': leafOutline,
      'radio-outline': radioOutline,
      'wifi-outline': wifiOutline,
      'play-outline': playOutline,
      'pause-outline': pauseOutline,
      'person': person,
      'notifications-outline': notificationsOutline,
      'pencil-outline': pencilOutline,
      'trash-outline': trashOutline,
      'add-outline': addOutline,
      'image-outline': imageOutline,
      'warning-outline': warningOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'help-circle-outline': helpCircleOutline,
      'water-outline': waterOutline,
      'sunny-outline': sunnyOutline,
      'medkit-outline': medkitOutline,
      'layers-outline': layersOutline,
      'nutrition-outline': nutritionOutline,
      'git-branch-outline': gitBranchOutline,
      'search-outline': searchOutline,
      'document-text-outline': documentTextOutline,
      'book-outline': bookOutline,
      'open-outline': openOutline,
      'save-outline': saveOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit() {
    this.generateGrid();
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  generateGrid() {
    this.gridCells = [];
    const totalCells = this.rows * this.cols;
    for (let i = 0; i < totalCells; i++) {
      this.gridCells.push({
        id: `S-${i + 1}`,
        hasDevice: i % 2 === 0
      });
    }
  }

  togglePump() {
    this.isPumpActive = !this.isPumpActive;
  }

  // Despliega las opciones al presionar el avatar
  async openPhotoMenu() {
    const hasPhoto = !!this.profileImage;

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Foto de Perfil',
      buttons: [
        {
          text: 'Agregar foto',
          icon: 'add-outline',
          disabled: hasPhoto, // Bloqueado si YA existe una foto
          handler: () => {
            this.triggerFileInput();
          }
        },
        {
          text: 'Editar foto',
          icon: 'image-outline',
          disabled: !hasPhoto, // Bloqueado si NO hay foto
          handler: () => {
            this.triggerFileInput();
          }
        },
        {
          text: 'Eliminar foto',
          role: 'destructive',
          icon: 'trash-outline',
          disabled: !hasPhoto, // Bloqueado si NO hay foto
          handler: () => {
            this.profileImage = null;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  // Simula el click en el input file oculto
  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  // Maneja el archivo de imagen seleccionado
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Guardar datos de perfil en la base de datos
   */
  async saveProfileData() {
    this.isSaving = true;

    // Objeto listo para ser enviado a la BD
    const payload = {
      name: this.profileData.name,
      email: this.profileData.email,
      website: this.profileData.website,
      profileImage: this.profileImage
    };

    try {
      // =========================================================================
      // 🚀 AQUÍ VA TU CÓDIGO/SERVICIO PARA GUARDAR EN TU BASE DE DATOS 🚀
      // Ejemplo usando tu servicio/HTTP:
      //
      // this.miServicio.guardarPerfil(payload).subscribe({
      //   next: async (res) => {
      //     this.isSaving = false;
      //     await this.mostrarToast('Perfil actualizado correctamente', 'success', 'checkmark-circle-outline');
      //   },
      //   error: async (err) => {
      //     this.isSaving = false;
      //     await this.mostrarToast('Error al guardar en la base de datos', 'danger', 'alert-circle-outline');
      //   }
      // });
      // =========================================================================

      // Simulación de guardado (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Datos preparados para la BD:', payload);

      this.isSaving = false;
      await this.mostrarToast('¡Perfil guardado exitosamente!', 'success', 'checkmark-circle-outline');

    } catch (error) {
      this.isSaving = false;
      console.error('Error al guardar:', error);
      await this.mostrarToast('Ocurrió un error al guardar', 'danger', 'alert-circle-outline');
    }
  }

  /**
   * Muestra notificaciones tipo Toast
   */
  private async mostrarToast(mensaje: string, color: 'success' | 'danger', icono: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color,
      icon: icono
    });
    await toast.present();
  }
}