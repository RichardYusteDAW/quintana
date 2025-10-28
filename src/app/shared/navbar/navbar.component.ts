import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TripleClickDirective } from '../../directives/triple-click.directive';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TripleClickDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  navigateAdmin() {
    this.router.navigate(['/admin/login']);
  }
}