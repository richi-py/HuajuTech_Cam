import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, leafOutline, leafSharp, mapOutline, mapSharp, wifiOutline, wifiSharp, hardwareChipOutline, hardwareChipSharp, personOutline, personSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Zona de Cultivo', url: '/folder/Cultivo', icon: 'map' },
    { title: 'Alertas', url: '/folder/Alerta', icon: 'warning' },
    { title: 'Recomendaciones', url: '/folder/Recomendaciones', icon: 'bookmark' },
    { title: 'Perfil', url: '/folder/perfil', icon: 'person'},
  ];
  constructor() {
    addIcons({
      'mail-outline': mailOutline,
      'mail-sharp': mailSharp,
      'person-outline': personOutline,
      'person-sharp': personSharp,
      'paper-plane-outline': paperPlaneOutline,
      'paper-plane-sharp': paperPlaneSharp,
      'heart-outline': heartOutline,
      'heart-sharp': heartSharp,
      'archive-outline': archiveOutline,
      'archive-sharp': archiveSharp,
      'trash-outline': trashOutline,
      'trash-sharp': trashSharp,
      'warning-outline': warningOutline,
      'warning-sharp': warningSharp,
      'bookmark-outline': bookmarkOutline,
      'bookmark-sharp': bookmarkSharp,
      'leaf-outline': leafOutline,
      'leaf-sharp': leafSharp,
      'map-outline': mapOutline,
      'map-sharp': mapSharp,
      'wifi-outline': wifiOutline,
      'wifi-sharp': wifiSharp,
      'hardware-chip-outline': hardwareChipOutline,
      'hardware-chip-sharp': hardwareChipSharp,
    });
  }
}
