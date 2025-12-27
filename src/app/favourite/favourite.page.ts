import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataStorage } from '../services/data-storage';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavouritePage implements OnInit {

  constructor(private storage:DataStorage) { }

  ngOnInit() {
  }

  async getRecipes() {
    try {
      let data = await this.storage.get("recipes");
    } catch (error) {
      console.log(error)
    }
  }

}
