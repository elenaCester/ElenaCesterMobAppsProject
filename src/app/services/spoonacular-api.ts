import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class SpoonacularApi {

  apiKey: string = "70759a4f7911402abcc53d3c51d3b759";
  baseUrl: string = "https://api.spoonacular.com/recipes";

  constructor(private http: HttpClient) {  }
  
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }

  //Method for getting the recipes in the Home Page
  getRecipes(query: string): Observable<any> {
    const params = new HttpParams()
      .set("query", query)
      .set("apiKey", this.apiKey);

    return this.http.get(`${this.baseUrl}/complexSearch`, { params });
  }

}
