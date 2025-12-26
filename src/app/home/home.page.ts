import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonSearchbar } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings, sparkles } from 'ionicons/icons';
import { SpoonacularApi } from '../services/spoonacular-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ FormsModule, CommonModule, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton],
})
export class HomePage {

  ingredients: string = "";
  recipeData: any[] = [];

  constructor(private spoon:SpoonacularApi,
    //Added router to direct to the recipe details page
    private router: Router) { }

  ngOnInit() {
    //Initialise recipe data with an empty array
    this.recipeData = [];
    //Add icons
    addIcons({ heart, settings, sparkles });
    this.searchPopularRecipes();
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

  searchPopularRecipes() {

    this.spoon.getRecipes(this.ingredients).subscribe({
      next: (result: any) => {
        console.log(result);
        this.recipeData = result.results.filter((recipe: any) => recipe.veryPopular === true); //Return only popular recipes
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });

  }

  searchVegan() {
    this.spoon.getRecipes(this.ingredients).subscribe({
      next: (result: any) => {
        console.log(result);
        this.recipeData = result.results.filter((recipe: any) => recipe.vegan === true); //Return only popular recipes
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  searchGlutenFree() {
    this.spoon.getRecipes(this.ingredients).subscribe({
      next: (result: any) => {
        console.log(result);
        this.recipeData = result.results.filter((recipe: any) => recipe.glutenFree === true); //Return only popular recipes
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  //Method to go from home page to details page, taking the recipe Id as a parameter
  loadRecipeDetails(recipeId: number) {
    this.router.navigate(['/recipe-details'], { queryParams: {id: recipeId}});
  }

}
