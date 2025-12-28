import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, settings } from 'ionicons/icons';
import { DataStorage } from '../services/data-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons ]
})
export class FavouritePage implements OnInit {
  storedRecipes: any[] = [];

  constructor(
    private storage:DataStorage,
    private router: Router
  ) { }

  ngOnInit() {
    addIcons({ home, settings });
    this.getFavRecipes();
  }

  async getFavRecipes() {
    try {
      const recipes = await this.storage.get("favourites");

      if(recipes) {
        this.storedRecipes = recipes;
      }
    } catch (error) {
      console.log(error)
    }
  }

  goToHomePage() {
    this.router.navigate(["/home"]);
  }

  goToSettingsPage() {
    this.router.navigate(["/settings"]);
  }

  //Method to go from favourite page to details page, taking the recipe Id as a parameter
  loadRecipeDetails(recipeId: number) {
    this.router.navigate(["/recipe-details"], { queryParams: {id: recipeId}});
  }

}
