import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { Router } from '@angular/router';
import { DataStorage } from '../services/data-storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonIcon, IonRadio, IonRadioGroup]
})
export class SettingsPage implements OnInit {
  //Metric selected as default
  measurementUnit: "metric" | "imperial" = "metric";

  constructor(
    private router: Router,
    private storage: DataStorage
  ) { }

  ngOnInit() {
    addIcons({ home, heart });
    this.getMeasurementUnit();
  }

  goToHomePage() {
    this.router.navigate(["/home"]);
  }

  goToFavPage() {
    this.router.navigate(["/favourite"]);
  }

  //Retrieve the selected measurement unit from storage and assign its value to the variable
  async getMeasurementUnit() {
    const savedUnit = await this.storage.get("measurementUnit");

    if (savedUnit) {
      this.measurementUnit = savedUnit;
    }

  }

  async saveMeasurementUnit(unit: "metric" | "imperial") {
    this.measurementUnit = unit;
    await this.storage.set("measurementUnit", unit);
  }

}
