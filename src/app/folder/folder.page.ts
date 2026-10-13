import { Component, input, ViewChild, ElementRef, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { 
  IonHeader, IonItem, IonCard, IonRange, IonCardContent, 
  RefresherCustomEvent, IonRefresher, IonRefresherContent, 
  IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, 
  IonIcon, IonCardHeader, IonCardTitle, IonList, IonLabel, 
  IonFab, IonFabButton, ActionSheetController 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  leafOutline, radioOutline, wifiOutline, playOutline, pauseOutline, 
  person, notificationsOutline, pencilOutline, trashOutline, addOutline, imageOutline,
  warningOutline, checkmarkCircleOutline, helpCircleOutline, 
  waterOutline, sunnyOutline, medkitOutline, layersOutline, 
  nutritionOutline, gitBranchOutline, searchOutline, 
  documentTextOutline, bookOutline, openOutline,
  alertCircleOutline, informationCircleOutline, batteryDeadOutline, checkmarkDoneCircleOutline
} from 'ionicons/icons';

// Interfaz para la estructura de las alertas
export interface Alerta {
  id: number;
  tipo: 'critical' | 'warning' | 'info';
  titulo: string;
  mensaje: string;
  fecha: Date;
  icono: string;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    IonItem, FormsModule, NgClass, IonCardHeader, IonCardTitle, IonList, IonLabel, 
    IonFab, IonFabButton, IonIcon, IonCard, IonRange, IonCardContent, 
    IonRefresherContent, IonRefresher, IonHeader, IonToolbar, IonButtons, 
    IonMenuButton, IonTitle, IonContent, IonButton,
  ],
})
export class FolderPage implements OnInit, OnDestroy {
  estado = "planta_en_mal_estado";
  readonly folder = input.required<string>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Temporizador y señal para actualización relativa del tiempo ("Hace 5 min")
  private timerId: any;
  public now = signal<number>(Date.now());

  // Lista de alertas activas. 
  // Para probar la vista de "Todo bien", simplemente deja este arreglo vacío: public alertas: Alerta[] = [];
  public alertas: Alerta[] = [
    {
      id: 1,
      tipo: 'critical',
      titulo: '¡La planta se está secando!',
      mensaje: 'El sensor de humedad del suelo en la Zona de Cultivo reporta un 12% (nivel muy bajo). Se requiere riego inmediato para evitar estrés hídrico.',
      fecha: new Date(Date.now() - 2 * 60 * 1000), // Hace 2 minutos
      icono: 'water-outline'
    }
  ];

  // Datos del perfil
  profileType: 'personal' | 'business' = 'personal';
  profileImage: string | null = null;
  profileData = {
    name: null,
    email: null,
    website: null
  };

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
      'alert-circle-outline': alertCircleOutline,
      'information-circle-outline': informationCircleOutline,
      'battery-dead-outline': batteryDeadOutline,
      'checkmark-done-circle-outline': checkmarkDoneCircleOutline
    });
  }

  ngOnInit() {
    this.generateGrid();

    // Actualiza el reloj cada minuto para refrescar "Hace X minutos"
    this.timerId = setInterval(() => {
      this.now.set(Date.now());
    }, 60000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  // Método para calcular el tiempo relativo transcurrido
  public getTimeAgo(fecha: Date): string {
    const actual = this.now();
    const diferenciaMs = actual - fecha.getTime();
    const minutos = Math.floor(diferenciaMs / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (minutos < 1) {
      return 'Hace un momento';
    } else if (minutos < 60) {
      return `Hace ${minutos} min`;
    } else if (horas < 24) {
      return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    } else {
      return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    }
  }

  // Métodos auxiliares para probar o limpiar alertas desde la UI si lo necesitas
  public limpiarAlertas() {
    this.alertas = [];
  }

  public simularAlertaSecado() {
    this.alertas = [
      {
        id: Date.now(),
        tipo: 'critical',
        titulo: '¡La planta se está secando!',
        mensaje: 'El sensor de humedad del suelo reporta un nivel crítico. Activa la bomba de agua.',
        fecha: new Date(),
        icono: 'water-outline'
      }
    ];
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1500);
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

  async openPhotoMenu() {
    const hasPhoto = !!this.profileImage;

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Foto de Perfil',
      buttons: [
        {
          text: 'Agregar foto',
          icon: 'add-outline',
          disabled: hasPhoto,
          handler: () => {
            this.triggerFileInput();
          }
        },
        {
          text: 'Editar foto',
          icon: 'image-outline',
          disabled: !hasPhoto,
          handler: () => {
            this.triggerFileInput();
          }
        },
        {
          text: 'Eliminar foto',
          role: 'destructive',
          icon: 'trash-outline',
          disabled: !hasPhoto,
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

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

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
}