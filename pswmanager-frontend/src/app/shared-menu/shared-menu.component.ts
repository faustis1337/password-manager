import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-menu',
  templateUrl: './shared-menu.component.html',
  styleUrls: ['./shared-menu.component.scss']
})
export class SharedMenuComponent {

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
}
