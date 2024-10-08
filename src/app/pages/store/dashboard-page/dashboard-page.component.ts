import { Component } from '@angular/core';
import { StoreNavbarComponent } from '../../../components/navbar-store/navbar-store.component';

@Component({
  selector: 'app-store-dashboard-page',
  standalone: true,
  imports: [StoreNavbarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class StoreDashboardPageComponent {

}
