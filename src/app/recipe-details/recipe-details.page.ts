import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { SpoonacularApi } from '../services/spoonacular-api';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton]
})
export class RecipeDetailsPage implements OnInit {

  recipeId: number = 716406;
  recipeData: any[] = [];

  constructor(private spoon:SpoonacularApi) { }

  ngOnInit() {
    //Initialise receipe details with an empty array
    this.recipeData = [];
    //Add icons
    addIcons({ heart });

    this.showRecipeDetails(this.recipeId);
  }

  showRecipeDetails(recipeId: number) {
    this.spoon.getRecipeDetails(recipeId).subscribe({
      next: (result) => {
        console.log(result);
        this.recipeData = result
      },
      error: (error) => console.error('Spoonacular error', error)
    });

  }

}
