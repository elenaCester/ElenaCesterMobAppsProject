import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SpoonacularApi } from '../services/spoonacular-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  recipeId: number = 716406;
  recipeData: any[] = [];

  constructor(private spoon:SpoonacularApi) { }

  ngOnInit() {
    //Initialise receipe details with an empty array
    this.recipeData = [];
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
