import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TvComponent } from "./tv/tv.component";

@Component({
  selector: 'app-shows',
  imports: [RouterLink, TvComponent],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.css'
})
export class ShowsComponent {
  shows = [
    { title: 'MAGIA FAMILIAR', path: '/shows/family', image: 'img/shows/cards.jpg' },
    { title: 'MAGIA DE CERCA', path: '/shows/close-up', image: 'img/shows/umbrella.jpg' },
    { title: 'MAGIA PARA ADULTOS', path: '/shows/adults', image: 'img/shows/fire.jpg' },
    { title: 'MAGIA PARA EMPRESAS', path: '/shows/corporate', image: 'img/shows/bill.jpg' }
  ];
}