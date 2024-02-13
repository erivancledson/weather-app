import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'c655c189dce2b1d0af480c273683d6ec';

  constructor(private http: HttpClient) {}

  getWeatherDatas(cityName: string): Observable<any>{ //pega o nome da cidade e retorna um Observable
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`, {})
  }
}
