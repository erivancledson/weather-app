import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { WeatherDatas } from 'src/app/models/interfaces/WatherDatas';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
//OnInit = ciclo de vida é chamado quando o componente é chamado em tela.
//quando acaba de ser renderizado
export class WeatherHomeComponent implements OnInit, OnDestroy{

  //$ diferenciar que estamos trabalhando com observable
  private readonly destroy$: Subject<void> = new Subject();

  initialCityName = 'Belo Jardim';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass; //font awesome icone

  //injetando o servico
  constructor(private weatherService: WeatherService){}

  //ciclo de vida
  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void{ //passa o nome da cidade
      //consumindo o servico
      this.weatherService.getWeatherDatas(cityName) //enviamos para api a cidade
        .pipe( //pipe manipula os dados passados takeUntil = pega o valor do submit passado e depois finaliza com o next
          takeUntil(this.destroy$) //assinatura que queremos desiscrever, quando a tela for desmontada
        )
        .subscribe({ //se increve para obter a resposta
          next: (response) => {
            response && (this.weatherDatas = response); // retorna os dados, && significa que se response não for vazio
            console.log(this.weatherDatas);
          },
          error: (error) => console.log(error)
        })
  }

  onSubmit(): void{ //quando clicar na lupa ele pesquisa
    this.getWeatherDatas(this.initialCityName); //ele pega o dado digitado do formulario
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    //quando  componente sair da tela, ele já destrou as coisas
    this.destroy$.next();
    this.destroy$.complete();
  }
}
