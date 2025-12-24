import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';
import { SpoonacularApi } from '../services/spoonacular-api';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons],
})
export class HomePage {

  ingredients: string = "lamb";
  recipes: any[] = [];
  /*
  options: HttpOptions = {
      url: "https://api.spoonacular.com/recipes/complexSearch"
      //url: "https://api.spoonacular.com/recipes"
  }*/

  constructor(private spoon:SpoonacularApi) { }

  updateIngredients(value: string) {
    this.ingredients= value;
  }

  ngOnInit() {
    //Add icons
    addIcons({ heart, settings });
    this.searchRecipes();
  }

  async searchRecipes() {
    let result = await this.spoon.getRecipes(this.ingredients);
    console.log(result);
  }

  

}
