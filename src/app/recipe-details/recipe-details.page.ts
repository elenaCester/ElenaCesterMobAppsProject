import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { SpoonacularApi } from '../services/spoonacular-api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataStorage } from '../services/data-storage';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton]
})
export class RecipeDetailsPage implements OnInit {

  recipeId!: number;
  recipeData: any = null;
  isFavourite!: boolean;
  //Set metric as default
  measurementUnit: "metric" | "imperial" = "metric";

  constructor(private spoon:SpoonacularApi,
    //router to direct back to home page
    private router: Router,
    //route injected from the home page
    private route: ActivatedRoute,
    //to access storage
    private storage: DataStorage
  ) { }

  ngOnInit() {
    //Initialise receipe details with an empty object
    this.recipeData = null;
    
    //Add icons
    addIcons({ heart });

    //Get recipe details using the param from the selected recipe in home page
    this.route.queryParams.subscribe(params => {
      this.recipeId = +params["id"]; //to convert the string query into a number
      if (this.recipeId) {
        this.showRecipeDetails(this.recipeId);
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  showRecipeDetails(recipeId: number) {
    this.spoon.getRecipeDetails(recipeId).subscribe({
      next: async (result) => {
        console.log(result);
        this.recipeData = result
        //Check what measurement unit should be displayed
        await this.getMeasurementUnit();
        //Check if the recipe is already saved as favourite
        await this.isFavRecipe();
      },
      error: (error) => console.error('Spoonacular error', error)
    });

  }

  async isFavRecipe() {
    const favourites = (await this.storage.get("favourites")) || [];
    this.isFavourite = favourites.some(
      (recipe: any) => recipe.id === this.recipeData.id
    );
  }

  async addOrRemoveFavourites() {
    if(!this.recipeData) return;

    const favourites = (await this.storage.get("favourites")) || [];

    const index = favourites.findIndex(
      (recipe: any) => recipe.id === this.recipeData.id
    );

    if (index > -1) {
      //Remove recipe from storage
      favourites.splice(index, 1);
      this.isFavourite = false;

    } else {
      //Add recipe to storage
      const favouriteRecipe = {
        id: this.recipeData.id,
        title: this.recipeData.title,
        image: this.recipeData.image,
        readyInMinutes: this.recipeData.readyInMinutes,
        servings: this.recipeData.servings
      }

      favourites.push(favouriteRecipe);
      this.isFavourite = true;
    }

    await this.storage.set("favourites", favourites);
  }

  //Retrieving saved unit defaulting to metric if no unit has been selected yet
  async getMeasurementUnit() {
    const unit = await this.storage.get("measurementUnit");
    this.measurementUnit = unit ?? "metric";
  }

}
