import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonItem, IonCard, IonRange, IonCardContent, RefresherCustomEvent, IonRefresher, IonRefresherContent, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonCardHeader, IonCardTitle, IonList, IonLabel, IonFab, IonFabButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { leafOutline, radioOutline, wifiOutline, playOutline, pauseOutline } from 'ionicons/icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonItem, FormsModule, IonCardHeader, IonCardTitle, IonList, IonLabel, IonFab, IonFabButton, IonIcon, IonCard, IonRange, IonCardContent, IonRefresherContent, IonRefresher, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class FolderPage {
  readonly folder = input.required<string>();

  constructor() {
    // 2. Registra los iconos para que Ionic pueda renderizarlos correctamente
    addIcons({
      'leaf-outline': leafOutline,
      'radio-outline': radioOutline,
      'wifi-outline': wifiOutline,
      'play-outline': playOutline,
      'pause-outline': pauseOutline
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  rows: number = 3;
  cols: number = 3;
  gridCells: any[] = [];

  loraConnected: boolean = true;
  connectedDevicesCount: number = 2;
  isPumpActive: boolean = false;

  ngOnInit() {
    this.generateGrid();
  }

  // Genera o redimensiona dinámicamente la matriz de celdas
  generateGrid() {
    this.gridCells = [];
    const totalCells = this.rows * this.cols;
    for (let i = 0; i < totalCells; i++) {
      this.gridCells.push({
        id: `S-${i + 1}`,
        hasDevice: i % 2 === 0 // Simulación: alterna celdas con y sin sensor LoRa
      });
    }
  }

  // Control manual de la bomba de agua
  togglePump() {
    this.isPumpActive = !this.isPumpActive;
    console.log(`Bomba de agua: ${this.isPumpActive ? 'ACTIVADA' : 'DESACTIVADA'}`);
  }
}