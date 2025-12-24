import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonSearchbar } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';
import { SpoonacularApi } from '../services/spoonacular-api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, CommonModule, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton],
})
export class HomePage {

  ingredients: string = "lamb,pea";
  recipeData: any[] = [];

  constructor(private spoon:SpoonacularApi) { }

  updateIngredients(value: string) {
    this.ingredients= value;
  }

  ngOnInit() {
    //Initialise recipe data with an empty array
    this.recipeData = [];
    //Add icons
    addIcons({ heart, settings });
    this.searchRecipes();
  }

  searchRecipes() {
    this.spoon.getRecipes(this.ingredients).subscribe({
      next: (result: any) => {
        console.log(result);
        this.recipeData = result.results; //Spoonacular API response JSON
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }
}
