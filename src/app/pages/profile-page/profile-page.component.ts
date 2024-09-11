import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NavbarComponent, MatCardModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

}
