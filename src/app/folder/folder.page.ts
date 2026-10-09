import { Component, input, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonItem, IonCard, IonRange, IonCardContent, 
  RefresherCustomEvent, IonRefresher, IonRefresherContent, 
  IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
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
  documentTextOutline, bookOutline, openOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    IonItem, FormsModule, IonCardHeader, IonCardTitle, IonList, IonLabel, 
    IonFab, IonFabButton, IonIcon, IonCard, IonRange, IonCardContent, 
    IonRefresherContent, IonRefresher, IonHeader, IonToolbar, IonButtons, 
    IonMenuButton, IonTitle, IonContent
  ],
})
export class FolderPage {
  estado = "planta_en_buen_estado";
  readonly folder = input.required<string>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Datos del perfil
  profileType: 'personal' | 'business' = 'personal';
  profileImage: string | null = null; // null simula que la foto está vacía
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
      'open-outline': openOutline
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
}