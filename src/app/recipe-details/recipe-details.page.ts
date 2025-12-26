import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { SpoonacularApi } from '../services/spoonacular-api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  constructor(private spoon:SpoonacularApi,
    //router to direct back to home page
    private router: Router,
    //route injected from the home page
    private route: ActivatedRoute) { }

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

  showRecipeDetails(recipeId: number) {
    this.spoon.getRecipeDetails(recipeId).subscribe({
      next: (result) => {
        console.log(result);
        this.recipeData = result
      },
      error: (error) => console.error('Spoonacular error', error)
    });

  }

  goHome() {
      this.router.navigate(['/home']);
    }

}
